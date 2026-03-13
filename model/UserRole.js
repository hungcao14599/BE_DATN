import Sequelize from "sequelize";
import { sequelize } from "../config/connect";

const UserRole = sequelize.define(
    "user_role", {
        userID: {
            field: "user_id",
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        roleID: {
            field: "id_role",
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
    }, {
        tableName: "user_role",
        timestamps: false,
    }
);

export default UserRole;