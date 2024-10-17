import { dirname } from "path";
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// No need to define __filename and __dirname in CommonJS
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.MYSQL_DB!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD!,
  {
    host: process.env.MYSQL_HOST!,
    dialect: "mysql",
    port: Number(process.env.MYSQL_PORT),
    logging: console.log,
  }
);

const db: any = {};

// Load all models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Ignore hidden files
      file !== basename && // Ignore the current file (index.js)
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js") && // Allow both .ts and .js files
      file.indexOf(".test.ts") === -1 // Ignore test files
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    model.initialize(sequelize); // Initialize the model
    db[model.name] = model; // Add to db object
  });

// Set up associations after all models have been loaded
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Log models and their associations
console.log("Models initialized: ", Object.keys(db)); // List of initialized models
console.log("db object: ", db); // Full `db` object, including models and associations

// Export Sequelize instance and the db object containing models
export default sequelize;
export { db };
