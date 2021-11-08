import Sequelize from "sequelize";
import { sequelize } from "../config/connect";
const Image = sequelize.define(
    "images", {
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
        url: {
            field: "url",
            type: Sequelize.STRING,
        },
        type: {
            field: "type",
            type: Sequelize.INTEGER,
        },
        idPost: {
            field: "post_id",
            type: Sequelize.INTEGER,
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
        tableName: "images",
        timestamps: false,
    }
);

export default Image;