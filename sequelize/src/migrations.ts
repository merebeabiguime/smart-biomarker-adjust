import { QueryInterface, Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";
import dotenv from "dotenv";

dotenv.config();

function getSequelize(
  dbName: string,
  dbUser: string,
  dbPassword: string,
  dbHost: string,
  dbPort: number
): Sequelize {
  const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log, // This will log all SQL queries
  });
  console.log("Database connection established: ", sequelize.getDatabaseName());

  return sequelize;
}

function getUmzug(sequelize: Sequelize): Umzug<QueryInterface> {
  return new Umzug({
    migrations: { glob: "src/migrations/*.js" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
}

async function runMigrations(
  umzug: Umzug<QueryInterface>,
  sequelize: Sequelize
): Promise<void> {
  try {
    await umzug.up();
    console.log("Migrations executed successfully:");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

async function onRunMigrations() {
  const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, MYSQL_PORT } =
    process.env;

  if (
    !MYSQL_HOST ||
    !MYSQL_USER ||
    !MYSQL_PASSWORD ||
    !MYSQL_DB ||
    !MYSQL_PORT
  ) {
    console.error("Missing required environment variables");
    process.exit(1);
  }

  const dbPort = Number(MYSQL_PORT);

  if (isNaN(dbPort)) {
    console.error("Invalid MYSQL_PORT");
    process.exit(1);
  }

  try {
    console.log("Starting migration process...");
    const sequelize = getSequelize(
      MYSQL_DB,
      MYSQL_USER,
      MYSQL_PASSWORD,
      MYSQL_HOST,
      dbPort
    );
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const umzug = getUmzug(sequelize);

    console.log("Executing migrations...");
    await runMigrations(umzug, sequelize);
    console.log("All migrations have been executed successfully");
    console.log("success=1");
  } catch (error) {
    console.error("An error occurred:", error);
    console.log("success=0");
    process.exit(1);
  }
}

export { onRunMigrations };
