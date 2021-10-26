const Sequelize = require("sequelize");
const sequelize = require("../config/connect");
const User = require("./User");
const Post = require("./Post");
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

PostLike.belongsTo(User, { foreignKey: "created_by" });
PostLike.belongsTo(Post, { foreignKey: "post_id" });

export default PostLike;