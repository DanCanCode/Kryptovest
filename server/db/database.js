const Sequelize = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(
//   "kryptovest",
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//   }
// );

const sequelize = new Sequelize(
  `postgresql://postgres:${process.env.DB_PASSWORD}@containers-us-west-125.railway.app:7875/railway`
);

module.exports = sequelize;
