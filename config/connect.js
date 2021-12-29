import Sequelize from "sequelize";
require("dotenv").config();
import dbConfig from "./db.config";

export const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    logging: console.log,
  }
);

export const Op = Sequelize.Op;
