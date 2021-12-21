import { Chat, Message, User, MemberChat } from "../model";
import httpStatus from "http-status";
import BaseError from "../utils/baseError";

export const fetchAllChats = async () => {
  try {
    return await Chat.findAll({
      where: {},
      include: [
        {
          model: Message,
          attributes: ["id", "message"],
          include: {
            model: User,
            attributes: ["id", "username"],
          },
        },
        {
          model: MemberChat,
          attributes: ["id", "type"],
          include: {
            model: User,
            attributes: ["id", "username"],
          },
        },
      ],
      order: [[Message, "id", "asc"]],
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const fetchChatsByUserId = async (userID, { size = 20, page = 1 }) => {
  try {
    const members = await MemberChat.findAll({ where: { userID } });
    console.log(
      "🚀 ~ file: chat.service.js ~ line 37 ~ fetchChatsByUserId ~ members",
      members
    );
    const list = [];
    await Promise.all(
      members.map(async (member) => {
        list.push(member.chatID);
      })
    );
    console.log(
      "🚀 ~ file: chat.service.js ~ line 42 ~ fetchChatsByUserId ~ list",
      list
    );

    const chats = await Chat.findAndCountAll({
      where: {
        id: { [Op.in]: list },
      },
      include: [
        {
          model: MemberChat,
          attributes: ["id", "type"],
          include: {
            model: User,
            attributes: ["id", "username", "avatar"],
          },
          where: {
            userID: { [Op.ne]: userID },
          },
        },
      ],
      limit: parseInt(size),
      offset: size * (page - 1),
      distinct: true,
      attributes: ["id", "name", "image", "type", "createdAt"],
    });
    console.log(
      "🚀 ~ file: chat.service.js ~ line 74 ~ fetchChatsByUserId ~ chats",
      chats
    );

    return {
      data: chats.rows,
      size,
      length: chats.length,
      currentPage: page,
      totalpage: Math.ceil(chats.count / size),
      totalElements: chats.count,
    };
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};
