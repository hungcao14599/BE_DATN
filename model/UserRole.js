const Sequelize = require("sequelize");
const sequelize = require("../config/connect");

const UserRole = sequelize.define(
    "user_role", {
        idUser: {
            field: "user_id",
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        idRole: {
            field: "role_id",
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
    }, {
        tableName: "user_role",
        timestamps: false,
    }
);

export default UserRole;