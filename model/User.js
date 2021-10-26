const Sequelize = require("sequelize");
const sequelize = require("../config/connect");
const Friend = require("./Friends");
const UserRole = require("./UserRole");
const Post = require("./Post");
const MemberChat = require("./MemberChat");
const User = sequelize.define(
    "users", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            field: "username",
            type: Sequelize.STRING,
        },
        password: {
            field: "password",
            type: Sequelize.STRING,
        },
        email: {
            field: "email",
            type: Sequelize.STRING,
        },
        firstname: {
            field: "firstname",
            type: Sequelize.STRING,
        },
        lastname: {
            field: "lastname",
            type: Sequelize.STRING,
        },
        description: {
            field: "description",
            type: Sequelize.STRING,
        },
        avatar: {
            field: "avatar",
            type: Sequelize.STRING,
        },
        coverImage: {
            field: "cover_image",
            type: Sequelize.STRING,
        },
        phone: {
            field: "phone",
            type: Sequelize.STRING,
        },
        birthday: {
            field: "birthday",
            type: Sequelize.DATE,
        },
        address: {
            field: "address",
            type: Sequelize.STRING,
        },
        status: {
            field: "status",
            type: Sequelize.INTEGER,
        },
        gender: {
            field: "gender",
            type: Sequelize.STRING,
        },
        verifyCode: {
            field: "verify_code",
            type: Sequelize.STRING,
        },
        isDelete: {
            field: "is_delete",
            type: Sequelize.BOOLEAN,
        },
        createdAt: {
            field: "created_at",
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: "updated_at",
            type: Sequelize.DATE,
        },
    }, {
        tableName: "users",
        timestamps: false,
    }
);

User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
User.hasMany(MemberChat, { foreignKey: "user_id" });
User.hasMany(Post, { foreignKey: "created_by" });
User.hasMany(Friend, { foreignKey: "user_id" });

export default User;