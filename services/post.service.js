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

export const fetchAllPostsOfUser = async({ size = 10, page = 1 },
    createdBy
) => {
    const friends = await Friend.findAll({
        where: { userID: createdBy, status: 1 },
    });
    const listID = [];
    const listGroupID = [];
    listID.push(createdBy);
    await Promise.all(
        friends.map(async(item) => {
            listID.push(item.friend);
        })
    );
    const groups = await GroupMember.findAll({ where: { userID: createdBy } });
    await Promise.all(
        groups.map(async(item) => {
            listGroupID.push(item.groupID);
        })
    );

    const posts = await Post.findAndCountAll({
        where: {
            isDelete: false,
            [Op.or]: [{
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
        order: [
            ["createdAt", "desc"]
        ],
        include: [{
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

export const fetchPostByUserID = async(createdBy, id) => {
    try {
        const post = await Post.findOne({
            where: { id, isDelete: false },
            include: [{
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
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const addPost = async({ content, type, groupID }, createdBy) => {
    try {
        const post = await Post.create({
            content,
            type,
            createdBy,
            groupID: type === 3 ? groupID : null,
            createdAt: Date.now(),
            isDelete: false,
            likes: 0,
            comments: 0,
        });
        // const data = await fetchPostByUserID(createdBy, post.id);
        return post;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const updatePost = async({ id, content, images }, createdBy) => {
    try {
        const post = await Post.findOne({
            where: { id },
            include: [{
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
                    as: "like",
                    attributes: ["id", "status"],
                    where: { createdBy },
                    require: false,
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
            updatedAt: Date.now(),
        });
        const imgs = await Image.findAll({
            where: { postID: id },
        });
        const list = [];
        await Promise.all(imgs.map((item) => list.push(item.id)));
        await Promise.all(async(item) => {
            if (!images.include(item)) {
                await Image.destroy({ where: { id: item } });
            }
        });
        const postItem = await Post.findOne({
            where: { id },
            include: [{
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
                    as: "like",
                    attributes: ["id", "status"],
                    where: { createdBy },
                    require: false,
                },
                {
                    model: Image,
                    attributes: ["id", "name", "url"],
                },
            ],
        });
        return postItem;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const uploadPostImages = async(req, res) => {
    req.up = "./assets/image/post";
    await multipleUploadFile(req, res);
    await Promise.all(
        req.files.map(async(file) => {
            await Image.create({
                name: file.filename,
                url: file.path,
                type: 2,
                createdBy: req.user.id,
                isDelete: false,
                createdAt: Date.now(),
                postID: parseInt(req.params.id),
            });
        })
    );
    return await fetchPostByUserID(req.user.id, parseInt(req.params.id));
};

export const deletePost = async({ postID }) => {
    await Post.destroy({
        where: { id: postID },
    });
};