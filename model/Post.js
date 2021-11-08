import Sequelize from "sequelize";
import { sequelize } from "../config/connect";
const Post = sequelize.define(
    "posts", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            field: "content",
            type: Sequelize.STRING,
        },
        likes: {
            field: "likes",
            type: Sequelize.INTEGER,
        },
        comments: {
            field: "comments",
            type: Sequelize.INTEGER,
        },
        type: {
            field: "type",
            type: Sequelize.INTEGER,
        },
        /* foreignKey */
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
        idGroup: {
            field: "id_group",
            type: Sequelize.INTEGER,
        },
    }, {
        tableName: "posts",
        timestamps: false,
    }
);

export default Post;