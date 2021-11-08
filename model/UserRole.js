import Sequelize from "sequelize";
import { sequelize } from "../config/connect";

const UserRole = sequelize.define(
    "user_role", {
        idUser: {
            field: "user_id",
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        idRole: {
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