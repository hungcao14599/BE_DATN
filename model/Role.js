const Sequelize = require("sequelize");
const sequelize = require("../config/connect");
const User = require("./User");
const Role = sequelize.define(
    "roles", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roleName: {
            field: "role_name",
            type: Sequelize.STRING,
        },
        description: {
            field: "description",
            type: Sequelize.STRING,
        },
        createdBy: {
            field: "created_by",
            type: Sequelize.INTEGER,
        },
        createdAt: {
            field: "created_at",
            type: Sequelize.DATE,
        },
        isDelete: {
            field: "is_delete",
            type: Sequelize.BOOLEAN,
        },
        updatedBy: {
            field: "updated_by",
            type: Sequelize.INTEGER,
        },
        updatedAt: {
            field: "updated_at",
            type: Sequelize.DATE,
        },
    }, {
        tableName: "roles",
        timestamps: false,
    }
);
/* Many to Many */
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id" });

export default Role;