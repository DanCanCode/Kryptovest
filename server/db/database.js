const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "kryptovest",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

module.exports = sequelize;