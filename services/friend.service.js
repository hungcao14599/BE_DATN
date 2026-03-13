import { User, Friend, Chat, MemberChat } from "../model";
import httpStatus from "http-status";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
export const fetchAllUserInFriendTable = async () => {
  try {
    const allFriends = await Friend.findAll({
      include: [
        {
          model: User,
          as: "user_friend",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar"],
        },
      ],
    });
    return allFriends;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchAllFriendOfUserByID = async (
  userID,
  { size = 10, page = 1, keyword = "" }
) => {
  try {
    const friends = await Friend.findAndCountAll({
      where: {
        userID,
        status: 1,
      },
      limit: parseInt(size),
      offset: size * (page - 1),
      include: [
        {
          model: User,
          as: "user_friend",
          attributes: ["id", "username", "avatar", "description"],
          where: {
            username: {
              [Op.like]: `%${keyword}%`,
            },
          },
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar", "description"],
        },
      ],
    });
    return {
      data: friends.rows,
      size: parseInt(size),
      length: friends.length,
      currentPage: parseInt(page),
      totalPage: Math.ceil(friends.count / size),
      totalElements: friends.count,
    };
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchAllNotFriendOfUserByID = async (
  userID,
  { size = 10, page = 1, keyword = "" }
) => {
  try {
    const friends = await Friend.findAll({ where: { userID } });
    const list = [];
    list.push(userID);
    await Promise.all(friends.map((item) => list.push(item.friend)));
    const users = await User.findAndCountAll({
      where: {
        id: {
          [Op.notIn]: list,
        },
        status: 1,
        username: {
          [Op.like]: `%${keyword}%`,
        },
      },
      limit: parseInt(size),
      offset: size * (page - 1),
      attributes: [
        "id",
        "username",
        "email",
        "firstname",
        "lastname",
        "avatar",
        "phone",
        "status",
        "birthday",
        "gender",
        "description",
        "address",
      ],
    });
    return {
      data: users.rows,
      size: parseInt(size),
      length: users.length,
      currentPage: parseInt(page),
      totalPage: Math.ceil(users.count / size),
      totalElements: users.count,
    };
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const addFriend = async (userID, friend) => {
  try {
    const check = await Friend.findOne({ where: { userID, friend } });
    if (check) throw new BaseError(httpStatus[406], "VALID FRIEND");
    await Friend.create({
      userID,
      friend,
      status: 2,
      createdAt: Date.now() + 3600000 * 7,
    });
    await Friend.create({
      userID: friend,
      friend: userID,
      status: 3,
      createdAt: Date.now() + 3600000 * 7,
    });

    const chatID = Math.floor(Math.random() * 100000000) + 1;
    await Chat.create({
      id: chatID,
      type: 1,
      createdAt: Date.now() + 3600000 * 7,
    });
    await MemberChat.create({
      chatID: chatID,
      userID,
      friend,
    });
    await MemberChat.create({
      chatID: chatID,
      userID: friend,
      friend: userID,
    });
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const approvalFriend = async (userID, { friend, isApproval }) => {
  try {
    const check = await Friend.findOne({
      where: { userID, friend, status: 1 },
    });
    if (check) throw new BaseError(httpStatus[406], "VALID FRIEND");
    const user = await Friend.findOne({ where: { userID, friend } });
    const user_friend = await Friend.findOne({
      where: {
        userID: friend,
        friend: userID,
      },
    });
    if (isApproval) {
      await user.update({
        ...user,
        status: 1,
        updatedAt: Date.now() + 3600000 * 7,
      });
      await user_friend.update({
        ...user,
        status: 1,
        updatedAt: Date.now() + 3600000 * 7,
      });
    } else {
      await user.destroy(), await user_friend.destroy();
    }
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchAllUserApprovalByID = async (
  userID,
  { size = 10, page = 1, keyword = "" }
) => {
  try {
    const friends = await Friend.findAndCountAll({
      where: { userID, status: 3 },
      limit: parseInt(size),
      offset: size * (page - 1),
      include: [
        {
          model: User,
          as: "user_friend",
          attributes: [
            "id",
            "username",
            "avatar",
            "description",
            "firstname",
            "lastname",
          ],
          where: {
            username: {
              [Op.like]: `%${keyword}%`,
            },
          },
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar", "description"],
        },
      ],
    });
    return {
      data: friends.rows,
      size: parseInt(size),
      length: friends.length,
      currentPage: parseInt(page),
      totalPage: Math.ceil(friends.count / size),
      totalElements: friends.count,
    };
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};
