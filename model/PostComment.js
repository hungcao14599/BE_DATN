const Sequelize = require("sequelize");
const sequelize = require("../config/connect");
const User = require("./User");
const Post = require("./Post");
const PostComment = sequelize.define(
    "post_comments", {
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
        tableName: "post_comments",
        timestamps: false,
    }
);

PostComment.belongsTo(User, { foreignKey: "created_by" });
PostComment.belongsTo(Post, { foreignKey: "post_id" });

export default PostComment;