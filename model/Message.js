import Sequelize from "sequelize";
import { sequelize } from "../config/connect";
const Message = sequelize.define(
    "messages", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        message: {
            field: "message",
            type: Sequelize.STRING,
        },
        sender: {
            field: "sender",
            type: Sequelize.INTEGER,
        },
        chatID: {
            field: "chat_id",
            type: Sequelize.INTEGER,
        },
        image: {
            field: "image",
            type: Sequelize.STRING,
        },
        isDelete: {
            field: "is_delete",
            type: Sequelize.BOOLEAN,
        },
        createdAt: {
            field: "created_at",
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: "updated_at",
            type: Sequelize.DATE,
        },
    }, {
        tableName: "messages",
        timestamps: false,
    }
);

export default Message;