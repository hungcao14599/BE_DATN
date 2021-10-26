const Sequelize = require("sequelize");
const sequelize = require("../config/connect");
const User = require("./User");
const Friend = sequelize.define(
    "friends", {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            field: "user_id",
            type: Sequelize.INTEGER,
        },
        friend: {
            field: "friend",
            type: Sequelize.INTEGER,
        },
        status: {
            field: "status",
            type: Sequelize.INTEGER,
        },
        createAt: {
            field: "create_at",
            type: Sequelize.DATE,
        },
        updateAt: {
            field: "update_at",
            type: Sequelize.DATE,
        },
    }, {
        tableName: "friends",
        timestamps: false,
    }
);

Friend.belongsTo(User, { as: "ban", foreignKey: "friend" });
Friend.belongsTo(User, { as: "user", foreignKey: "user_id" });

export default Friend;