import Sequelize from "sequelize";
import { sequelize } from "../config/connect";

const MemberChat = sequelize.define(
    "member_chat", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idChat: {
            field: "chat_id",
            type: Sequelize.INTEGER,
        },
        idUser: {
            field: "user_id",
            type: Sequelize.INTEGER,
        },
        role: {
            field: "role",
            type: Sequelize.INTEGER,
        },
        type: {
            field: "type",
            type: Sequelize.INTEGER,
        },
    }, {
        tableName: "member_chat",
        timestamps: false,
    }
);

export default MemberChat;