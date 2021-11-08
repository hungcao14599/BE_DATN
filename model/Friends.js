import Sequelize from "sequelize";
import { sequelize } from "../config/connect";
const Friend = sequelize.define(
    "friends", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            field: "user_id",
            type: Sequelize.INTEGER,
        },
        friend: {
            field: "friend",
            type: Sequelize.INTEGER,
        },
        status: {
            field: "status",
            type: Sequelize.INTEGER,
        },
        createAt: {
            field: "create_at",
            type: Sequelize.DATE,
        },
        updateAt: {
            field: "update_at",
            type: Sequelize.DATE,
        },
    }, {
        tableName: "friends",
        timestamps: false,
    }
);

export default Friend;