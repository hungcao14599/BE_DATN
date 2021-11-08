import Sequelize from "sequelize";
import { sequelize } from "../config/connect";
const PostLike = sequelize.define(
    "post_likes", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            field: "status",
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
    }, {
        tableName: "post_likes",
        timestamps: false,
    }
);

export default PostLike;