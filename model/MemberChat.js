import Sequelize from "sequelize";
import { sequelize, Op } from "../config/database";

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

MemberChat.belongsTo(Chat, { foreignKey: "chat_id" });
MemberChat.belongsTo(User, { foreignKey: "user_id" });

export default MemberChat;