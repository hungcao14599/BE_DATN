const Sequelize = require("sequelize");
const sequelize = require("../config/connect");
const User = require("./User");
const PostComment = require("./PostComment");
const PostLike = require("./PostLike");
const GroupPage = require("./GroupPage");
const Image = require("./Image");
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

Post.belongsTo(User, { foreignKey: "created_by" });
Post.hasMany(PostComment, { as: "comment", foreignKey: "post_id" });
Post.hasMany(PostLike, { as: "like", foreignKey: "post_id" });
Post.hasMany(Image, { foreignKey: "post_id" });
Post.belongsTo(GroupPage, { foreignKey: "group_id" });

export default Post;