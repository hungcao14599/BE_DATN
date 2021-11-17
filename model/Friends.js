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
            type: Sequelize.ENUM(1, 2, 3),
        },
        createAt: {
            field: "created_at",
            type: Sequelize.DATE,
        },
        updateAt: {
            field: "updated_at",
            type: Sequelize.DATE,
        },
    }, {
        tableName: "friends",
        timestamps: false,
    }
);

export default Friend;