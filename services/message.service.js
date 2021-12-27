import { Message, User } from "../model";
import httpStatus from "http-status";
import BaseError from "../utils/BaseError";

export const fetchMessageByChatId = async (chatID, { size = 20, page = 1 }) => {
  try {
    const messages = await Message.findAndCountAll({
      where: { chatID },
      include: {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
      limit: parseInt(size),
      offset: size * (page - 1),
      distinct: true,
      attributes: ["id", "message", "createdAt"],
      order: [["createdAt", "desc"]],
    });
    return {
      data: messages.rows.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }),
      size: parseInt(size),
      length: messages.length,
      totalPage: Math.ceil(messages.count / size),
      totalElements: messages.count,
    };
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const createMessage = async ({ username, message, chatID }) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new BaseError(httpStatus[404], "INVALID USER");
    const newMessage = await Message.create({
      message,
      sender: user.id,
      isDelete: false,
      chatID,
      createdAt: Date.now() + 3600000 * 7,
    });
    return await Message.findOne({
      where: { id: newMessage.id },
      include: {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};
