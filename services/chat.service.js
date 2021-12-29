import { Chat, Message, User, MemberChat } from "../model";
import httpStatus from "http-status";
import BaseError from "../utils/BaseError";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

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

export const fetchChatsByUserId = async (
  userID,
  { size = 20, page = 1, keyword = "" }
) => {
  const members = await MemberChat.findAll({ where: { userID } });
  const list = [];
  await Promise.all(
    members.map(async (member) => {
      list.push(member.chatID);
    })
  );
  const chats = await Chat.findAndCountAll({
    where: {
      id: { [Op.in]: list },
    },
    include: [
      {
        model: MemberChat,
        // where: {
        //   userID: { [Op.ne]: userID },
        // },
        attributes: ["id", "type"],
        include: {
          model: User,
          where: {
            username: {
              [Op.like]: `%${keyword}%`,
            },
            id: {
              [Op.ne]: userID,
            },
          },
          attributes: ["id", "username", "avatar", "firstname", "lastname"],
        },
      },
    ],
    limit: parseInt(size),
    offset: size * (page - 1),
    distinct: true,
    attributes: ["id", "name", "image", "type", "createdAt"],
  });

  return {
    data: chats.rows,
    size,
    length: chats.length,
    currentPage: page,
    totalpage: Math.ceil(chats.count / size),
    totalElements: chats.count,
  };
};
