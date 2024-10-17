"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const umzug_1 = require("umzug");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getSequelize(databaseUri) {
    const sequelize = new sequelize_1.Sequelize(databaseUri, {
        logging: console.log,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        dialect: "mysql",
    });
    return sequelize;
}
function getUmzug(sequelize) {
    const umzug = new umzug_1.Umzug({
        migrations: { glob: "migrations/*.js" },
        context: sequelize.getQueryInterface(),
        storage: new umzug_1.SequelizeStorage({ sequelize }),
        logger: console,
    });
    return umzug;
}
async function runMigrations(umzug, sequzlize) {
    try {
        await umzug.up();
        console.log("Migrations exécutées avec succès");
    }
    catch (error) {
        console.error("Erreur lors de l'exécution des migrations:", error);
        throw error;
    }
    finally {
        await sequzlize.close();
    }
}
async function main() {
    const dbHost = process.env.MYSQL_HOST;
    const dbUser = process.env.MYSQL_USER;
    const dbPassword = process.env.MYSQL_PASSWORD;
    const dbName = process.env.MYSQL_DB;
    const dbPort = process.env.MYSQL_PORT;
    try {
        // Construire les URL de connexion pour MySQL
        const dbUri = `mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
        const sequelize = getSequelize(dbUri);
        const umzug = getUmzug(sequelize);
        // Exécuter les migrations sur l'instance blue
        console.log("Exécution des migrations sur l'instance");
        await runMigrations(umzug, sequelize);
        console.log("Toutes les migrations ont été exécutées avec succès");
    }
    catch (error) {
        console.error("Une erreur est survenue:", error);
        process.exit(1);
    }
}
main();
