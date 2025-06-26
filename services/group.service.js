import { GroupPage, GroupMember, User, Image, Post } from "../model";
import httpStatus from "http-status";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export const fetchAllGroups = async ({ keyword = "", size = 10, page = 1 }) => {
  // try {
  const groups = await GroupPage.findAndCountAll({
    where: {
      isDelete: false,
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },
    limit: parseInt(size),
    offset: size * (page - 1),
    attributes: [
      "id",
      "name",
      "description",
      "caption",
      "status",
      "avatar",
      "coverImage",
      "createdAt",
    ],
  });
  return {
    data: groups.rows,
    size: parseInt(size),
    length: groups.length,
    currentPage: parseInt(page),
    totalPage: Math.ceil(groups.count / size),
    totalElements: groups.count,
  };
  // } catch (error) {
  //   return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  // }
};

export const addGroup = async (createdBy, { name, description, caption }) => {
  try {
    const group = await GroupPage.create({
      name,
      description,
      caption,
      status: 1,
      avatar: "",
      createdBy,
      isDelete: false,
      createdAt: Date.now() + 3600000 * 7,
    });
    await GroupMember.create({
      groupID: group.id,
      userID: createdBy,
      role: 1,
      status: 1,
    });
    return group;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const updateInfoGroup = async (updatedBy, { id, name, description }) => {
  try {
    const group = await GroupPage.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "description",
        "caption",
        "status",
        "avatar",
        "coverImage",
        "createdAt",
        "createdBy",
        "updatedBy",
      ],
    });
    if (!group) throw new BaseError(httpStatus[404], "INVALID GROUP");
    if (group.createdBy !== updatedBy) {
      throw new BaseError(httpStatus.BAD_REQUEST, "ONLY OWNER CAN UPDATE");
    }
    const data = await group.update({
      ...group,
      name,
      description,
      updatedBy,
      updatedAt: Date.now() + 3600000 * 7,
    });
    return data;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const userJoinGroup = async (userID, groupID) => {
  try {
    const check = await GroupMember.findOne({ where: { userID, groupID } });
    if (check) throw new BaseError(httpStatus[500], "VALID MEMBER");
    const member = await GroupMember.create({
      userID,
      groupID,
      role: 2,
      status: 2,
    });
    return member;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const groupAdminApprovalUserJoinGroup = async (
  adminID,
  { userID, groupID, isApproval }
) => {
  try {
    const checkMember = await GroupMember.findOne({
      where: { userID, groupID },
    });
    if (!checkMember) throw new BaseError(httpStatus[404], "INVALID MEMBER");

    if (adminID === userID)
      throw new BaseError(httpStatus.BAD_REQUEST, "ONLY OWNER CAN APPROVAL");

    if (isApproval) {
      await checkMember.update({
        ...checkMember,
        status: 1,
      });
    } else {
      await checkMember.destroy();
    }
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchMemberInGroup = async (
  { groupID },
  { size = 10, page = 1, keyword = "" }
) => {
  try {
    const members = await GroupMember.findAndCountAll({
      where: { groupID, status: 1 },
      include: [
        {
          model: User,
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
      ],
      limit: parseInt(size),
      offset: size * (page - 1),
      attributes: ["id", "role", "status"],
    });
    return {
      data: members.rows,
      size: parseInt(size),
      length: members.length,
      currentPage: parseInt(page),
      totalPage: Math.ceil(members.count / size),
      totalElements: members.count,
    };
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchUserJoinGroup = async (
  { groupID },
  { size = 10, page = 1, keyword = "" }
) => {
  try {
    const members = await GroupMember.findAndCountAll({
      where: { groupID, status: 2 },
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatar", "description"],
          where: {
            username: {
              [Op.like]: `%${keyword}%`,
            },
          },
        },
      ],
      limit: parseInt(size),
      offset: size * (page - 1),
      attributes: ["id", "role", "status"],
    });
    return {
      data: members.rows,
      size: parseInt(size),
      length: members.length,
      currentPage: parseInt(page),
      totalPage: Math.ceil(members.count / size),
      totalElements: members.count,
    };
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchGroupsOfUser = async (
  userID,
  { size = 10, page = 1, keyword = "" }
) => {
  try {
    const userGroup = await GroupMember.findAll({
      where: { userID, status: 1 },
    });
    const list = [];
    await Promise.all(userGroup.map((item) => list.push(item.groupID)));
    const groupInfo = await GroupPage.findAndCountAll({
      where: {
        isDelete: false,
        id: {
          [Op.in]: list,
        },
        name: {
          [Op.like]: `%${keyword}%`,
        },
      },
      limit: parseInt(size),
      offset: size * (page - 1),
      attributes: [
        "id",
        "name",
        "description",
        "caption",
        "status",
        "avatar",
        "coverImage",
        "createdAt",
      ],
    });
    return {
      data: groupInfo.rows,
      size: parseInt(size),
      length: groupInfo.length,
      currentPage: parseInt(page),
      totalPage: Math.ceil(groupInfo.count / size),
      totalElements: groupInfo.count,
    };
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchOtherGroupsOfUser = async (
  userID,
  { size = 10, page = 1, keyword = "" }
) => {
  try {
    const userGroup = await GroupMember.findAll({
      where: { userID },
    });
    const list = [];
    await Promise.all(userGroup.map((item) => list.push(item.groupID)));
    const groupOtherInfo = await GroupPage.findAndCountAll({
      where: {
        isDelete: false,
        id: {
          [Op.notIn]: list,
        },
        name: {
          [Op.like]: `%${keyword}%`,
        },
      },
      limit: parseInt(size),
      offset: size * (page - 1),
      attributes: [
        "id",
        "name",
        "description",
        "caption",
        "status",
        "avatar",
        "coverImage",
        "createdAt",
      ],
    });
    return {
      data: groupOtherInfo.rows,
      size: parseInt(size),
      length: groupOtherInfo.length,
      currentPage: parseInt(page),
      totalPage: Math.ceil(groupOtherInfo.count / size),
      totalElements: groupOtherInfo.count,
    };
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchGroupById = async ({ id }) => {
  try {
    const group = await GroupPage.findOne({
      where: {
        isDelete: false,
        id,
      },

      attributes: [
        "id",
        "name",
        "description",
        "caption",
        "status",
        "avatar",
        "coverImage",
        "createdAt",
      ],
    });
    if (!group) throw new BaseError(httpStatus[404], "INVALID GROUP");
    return group;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchMemberJoinGroup = async (
  { id },
  { size = 10, page = 1, keyword = "" }
) => {
  const members = await GroupMember.findAndCountAll({
    where: { groupID: id, status: 2 },
    include: [
      {
        model: User,
        attributes: ["id", "username", "avatar", "description"],
        where: { username: { [Op.like]: `%${keyword}%` } },
      },
    ],
    limit: parseInt(size),
    offset: size * (page - 1),
    distinct: true,
    attributes: ["id", "role", "status"],
  });
  return {
    data: members.rows,
    size,
    length: members.length,
    currentPage: page,
    totalpage: Math.ceil(members.count / size),
    totalElements: members.count,
  };
};

export const fetchImgByGroupId = async ({ groupID }) => {
  const group = await GroupPage.findOne({ where: { id: groupID } });
  if (!group) return { error: "INVALID GROUP" };
  const posts = await Post.findAll({ where: { groupID } });
  const listPostID = [];
  await Promise.all(
    posts.map(async (item) => {
      listPostID.push(item.id);
    })
  );
  const images = await Image.findAll({
    where: {
      postID: {
        [Op.in]: listPostID,
      },
      isDelete: false,
    },
  });
  return images;
};
