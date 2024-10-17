"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migrations_1 = require("./migrations");
const main = async () => {
    await (0, migrations_1.onRunMigrations)();
};
main();
