import Sequelize from "sequelize";
import { sequelize } from "../config/connect";
const GroupPage = sequelize.define(
    "group_pages", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            field: "name",
            type: Sequelize.STRING,
        },
        description: {
            field: "description",
            type: Sequelize.STRING,
        },
        status: {
            field: "status",
            type: Sequelize.INTEGER,
        },
        avatar: {
            field: "avatar",
            type: Sequelize.STRING,
        },
        coverImage: {
            field: "cover_image",
            type: Sequelize.STRING,
        },
        isDelete: {
            field: "is_delete",
            type: Sequelize.BOOLEAN,
        },
        createdBy: {
            field: "created_by",
            type: Sequelize.INTEGER,
        },
        createdAt: {
            field: "created_at",
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: "updated_at",
            type: Sequelize.DATE,
        },
        updatedBy: {
            field: "updated_by",
            type: Sequelize.INTEGER,
        },
    }, {
        tableName: "group_pages",
        timestamps: false,
    }
);

export default GroupPage;