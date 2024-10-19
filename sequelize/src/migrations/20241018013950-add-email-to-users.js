"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "email", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      after: "lastName", // This will add the email column after the lastName column
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "email");
  },
};
