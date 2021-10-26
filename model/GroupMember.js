const Sequelize = require("sequelize");
const sequelize = require("../config/connect");
const User = require("./User");
const GroupMember = sequelize.define(
    "group_member", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idGroup: {
            field: "group_id",
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
        status: {
            field: "status",
            type: Sequelize.INTEGER,
        },
    }, {
        tableName: "group_member",
        timestamps: false,
    }
);

GroupMember.belongsTo(User, { foreignKey: "user_id" });

export default GroupMember;