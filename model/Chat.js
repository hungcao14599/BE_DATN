import Sequelize from "sequelize";
import { sequelize } from "../config/connect";
const Chat = sequelize.define(
  "chats",
  {
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
    image: {
      field: "image",
      type: Sequelize.STRING,
    },
    type: {
      field: "type",
      type: Sequelize.INTEGER,
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
  },
  {
    tableName: "chats",
    timestamps: false,
  }
);

export default Chat;
