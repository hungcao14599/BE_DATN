import {
  Post,
  User,
  Friend,
  Image,
  GroupMember,
  PostComment,
  PostLike,
  GroupPage,
} from "../model";
import httpStatus from "http-status";
import Sequelize from "sequelize";
import { multipleUploadFile } from "../middleware/uploadMulter";
const Op = Sequelize.Op;

export const fetchAllPosts = async ({ size = 10, page = 1 }, createdBy) => {
  const friends = await Friend.findAll({
    where: { userID: createdBy, status: 1 },
  });
  const listID = [];
  const listGroupID = [];
  listID.push(createdBy);
  await Promise.all(
    friends.map(async (item) => {
      listID.push(item.friend);
    })
  );
  const groups = await GroupMember.findAll({ where: { userID: createdBy } });
  await Promise.all(
    groups.map(async (item) => {
      listGroupID.push(item.groupID);
    })
  );

  const posts = await Post.findAndCountAll({
    where: {
      isDelete: false,
      [Op.or]: [
        {
          createdBy: {
            [Op.in]: listID,
          },
          groupID: null,
        },
        {
          groupID: {
            [Op.in]: listGroupID,
          },
        },
      ],
    },
    limit: parseInt(size),
    offset: size * (page - 1),
    distinct: true,
    order: [["createdAt", "desc"]],
    include: [
      {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
      {
        model: PostComment,
        as: "comment",
        attributes: ["id", "content", "createdAt"],
        include: {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      },
      {
        model: PostLike,
        attributes: ["id", "status"],
        as: "like",
        where: { createdBy },
        required: false,
      },
      {
        model: Image,
        attributes: ["id", "name", "url"],
      },
      {
        model: GroupPage,
        attributes: ["id", "name"],
      },
    ],
  });
  return {
    data: posts.rows,
    size,
    length: posts.length,
    currentPage: page,
    totalpage: Math.ceil(posts.count / size),
    totalElements: posts.count,
  };
};

export const fetchAllPostsInGroup = async (
  { size = 10, page = 1 },
  createdBy
) => {
  const friends = await Friend.findAll({
    where: { userID: createdBy, status: 1 },
  });
  const listID = [];
  const listGroupID = [];
  listID.push(createdBy);
  await Promise.all(
    friends.map(async (item) => {
      listID.push(item.friend);
    })
  );
  const groups = await GroupMember.findAll({ where: { userID: createdBy } });
  await Promise.all(
    groups.map(async (item) => {
      listGroupID.push(item.groupID);
    })
  );

  const posts = await Post.findAndCountAll({
    where: {
      type: 3,
      isDelete: false,
      [Op.or]: [
        {
          createdBy: {
            [Op.in]: listID,
          },
          groupID: null,
        },
        {
          groupID: {
            [Op.in]: listGroupID,
          },
        },
      ],
    },
    limit: parseInt(size),
    offset: size * (page - 1),
    distinct: true,
    order: [["createdAt", "desc"]],
    include: [
      {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
      {
        model: PostComment,
        as: "comment",
        attributes: ["id", "content", "createdAt"],
        include: {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      },
      {
        model: PostLike,
        attributes: ["id", "status"],
        as: "like",
        where: { createdBy },
        required: false,
      },
      {
        model: Image,
        attributes: ["id", "name", "url"],
      },
      {
        model: GroupPage,
        attributes: ["id", "name"],
      },
    ],
  });
  return {
    data: posts.rows,
    size,
    length: posts.length,
    currentPage: page,
    totalpage: Math.ceil(posts.count / size),
    totalElements: posts.count,
  };
};

export const fetchPostByPostID = async (createdBy, id) => {
  try {
    const post = await Post.findOne({
      where: { id, isDelete: false },
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
        {
          model: PostComment,
          as: "comment",
          attributes: ["id", "content", "createdAt"],
          include: {
            model: User,
            attributes: ["id", "username", "avatar"],
          },
        },
        {
          model: PostLike,
          attributes: ["id", "status"],
          as: "like",
          where: { createdBy },
          required: false,
        },
        {
          model: Image,
          attributes: ["id", "name", "url"],
        },
      ],
    });
    if (!post) throw new BaseError(httpStatus.NOT_FOUND, "INVALID POST");
    return post;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const addPost = async ({ content, type, groupID }, createdBy) => {
  try {
    const post = await Post.create({
      content,
      type,
      createdBy,
      groupID: type === 3 ? groupID : null,
      createdAt: Date.now() + 3600000 * 7,
      isDelete: false,
      likes: 0,
      comments: 0,
    });
    const data = await fetchPostByPostID(createdBy, post.id);
    return data;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const updatePost = async ({ id, content, images }, createdBy) => {
  try {
    const post = await Post.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
        {
          model: PostComment,
          as: "comment",
          attributes: ["id", "content"],
          include: {
            model: User,
            attributes: ["id", "username", "avatar"],
          },
        },
        {
          model: PostLike,
          attributes: ["id", "status"],
          as: "like",
          where: { createdBy },
          required: false,
        },
        {
          model: Image,
          attributes: ["id", "name", "url"],
        },
      ],
    });
    if (!post) throw new BaseError(httpStatus.NOT_FOUND, "INVALID POST");
    if (post.user.id !== createdBy)
      throw new BaseError(httpStatus.NOT_FOUND, "INVALID POST");
    await post.update({
      ...post,
      content,
      updatedAt: Date.now() + 3600000 * 7,
      updatedBy: createdBy,
    });
    const imgs = await Image.findAll({
      where: { postID: id },
    });
    const list = [];
    await Promise.all(imgs.map(async (item) => list.push(item.id)));
    await Promise.all(
      list.map(async (item) => {
        if (!images.include(item)) {
          await Image.destroy({ where: { id: item } });
        }
      })
    );

    const data = await fetchPostByPostID(createdBy, post.id);
    return data;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const uploadPostImages = async (req, res) => {
  req.des = "./assets/image/post";
  await multipleUploadFile(req, res);
  await Promise.all(
    req.files.map(async (file) => {
      await Image.create({
        name: file.filename,
        url: file.path,
        type: 2,
        createdBy: req.user.id,
        isDelete: false,
        createdAt: Date.now() + 3600000 * 7,
        postID: req.params.id,
      });
    })
  );
  return await fetchPostByPostID(req.user.id, req.params.id);
};

export const deletePost = async ({ id }, createdBy) => {
  try {
    const post = await Post.findOne({
      where: { id },
      include: {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
    });
    if (!post) throw new BaseError(httpStatus.NOT_FOUND, "INVALID POST");
    // if (post.user.id !== createdBy)
    //   throw new BaseError(httpStatus.NOT_FOUND, "INVALID POST");
    await post.update({
      ...post,
      isDelete: true,
    });
    return post;
  } catch (error) {
    return res.status(500).json({
    status: httpStatus[500],
    message: "INTERNAL SERVER ERROR",
    error: error.message || error, // optional, giúp debug
  });
  }
};

export const fetchAllPostByUserName = async (
  { username },
  { size = 10, page = 1 },
  createdBy
) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new BaseError(httpStatus.NOT_FOUND, "INVALID USER");

  const posts = await Post.findAndCountAll({
    where: {
      isDelete: false,
      createdBy: user.id,
      groupID: null,
    },
    limit: parseInt(size),
    offset: size * (page - 1),
    distinct: true,
    order: [["createdAt", "desc"]],
    include: [
      {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
      {
        model: PostComment,
        as: "comment",
        attributes: ["id", "content", "createdAt"],
        include: {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      },
      {
        model: PostLike,
        attributes: ["id", "status"],
        as: "like",
        where: { createdBy },
        required: false,
      },
      {
        model: Image,
        attributes: ["id", "name", "url"],
      },
    ],
  });
  return {
    data: posts.rows,
    size,
    length: posts.length,
    currentPage: page,
    totalpage: Math.ceil(posts.count / size),
    totalElements: posts.count,
  };
};

export const fetchAllPostByGroupID = async (
  { groupID },
  { size = 10, page = 1 },
  createdBy
) => {
  const posts = await Post.findAndCountAll({
    where: {
      isDelete: false,
      groupID,
    },
    limit: parseInt(size),
    offset: size * (page - 1),
    order: [["createdAt", "desc"]],
    distinct: true,
    include: [
      {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
      {
        model: PostComment,
        as: "comment",
        attributes: ["id", "content", "createdAt"],
        include: {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      },
      {
        model: PostLike,
        attributes: ["id", "status"],
        as: "like",
        where: { createdBy },
        required: false,
      },
      {
        model: Image,
        attributes: ["id", "name", "url", "type"],
      },
    ],
  });
  return {
    data: posts.rows,
    size,
    length: posts.length,
    currentPage: page,
    totalpage: Math.ceil(posts.count / size),
    totalElements: posts.count,
  };
};

export const fetchAllPostsRoleAdmin = async (
  { size = 10, page = 1 },
  createdBy
) => {
  const posts = await Post.findAndCountAll({
    where: {
      isDelete: false,
    },
    limit: parseInt(size),
    offset: size * (page - 1),
    distinct: true,
    order: [["createdAt", "desc"]],
    include: [
      {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
      {
        model: PostComment,
        as: "comment",
        attributes: ["id", "content", "createdAt"],
        include: {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      },
      {
        model: PostLike,
        attributes: ["id", "status"],
        as: "like",
        where: { createdBy },
        required: false,
      },
      {
        model: Image,
        attributes: ["id", "name", "url"],
      },
    ],
  });
  return {
    data: posts.rows,
    size,
    length: posts.length,
    currentPage: page,
    totalpage: Math.ceil(posts.count / size),
    totalElements: posts.count,
  };
};
