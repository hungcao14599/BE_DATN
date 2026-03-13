import Sequelize from "sequelize";
import { sequelize } from "../config/connect";
const GroupMember = sequelize.define(
    "group_member", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        groupID: {
            field: "group_id",
            type: Sequelize.INTEGER,
        },
        userID: {
            field: "user_id",
            type: Sequelize.INTEGER,
        },
        role: {
            field: "role",
            type: Sequelize.INTEGER,
        },
        status: {
            field: "status",
            type: Sequelize.INTEGER,
        },
    }, {
        tableName: "group_member",
        timestamps: false,
    }
);

export default GroupMember;