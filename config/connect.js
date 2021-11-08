import Sequelize from "sequelize";
require("dotenv").config();

const { DB_NAME, DB_USERNAME, PASSWORD, HOST, dialect } = process.env;
export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, PASSWORD, {
    host: HOST,
    dialect: dialect,
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000,
    },
});

export const OP = Sequelize.Op;