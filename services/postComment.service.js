import { Post, PostComment, User } from "../model";
import httpStatus from "http-status";
import BaseError from "../utils/baseError";

export const fetchCommentByPost = async(postID, { size = 10, page = 1 }) => {
    try {
        const comments = await PostComment.findAndCountAll({
            where: { postID, isDelete: false },
            limit: parseInt(size),
            offset: size * (page - 1),
            include: {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
            attributes: ["id", "content", "createdAt"],
            order: [
                ["createdAt", "desc"]
            ],
        });
        return {
            data: comments.rows.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }),
            size: parseInt(size),
            length: comments.length,
            currentPage: parseInt(page),
            totalPages: Math.ceil(comments.count / size),
            totalElements: comments.count,
        };
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const addCommentToPost = async({ content, postID }, createdBy) => {
    try {
        const post = await Post.findOne({ where: { id: postID } });
        if (!post) throw new BaseError(httpStatus.NOT_FOUND, "INVALID POST");
        const comment = await PostComment.create({
            content,
            postID,
            createdBy,
            createdAt: Date.now() + 3600000 * 7,
            isDelete: false,
        });
        await post.update({
            ...post,
            comments: post.comments + 1,
        });
        const data = await PostComment.findOne({
            where: { id: comment.id },
            include: {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
            attributes: ["id", "content", "createdAt"],
            order: [
                ["createdAt", "asc"]
            ],
        });
        return data;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};
export const updateCommentOfPost = async({ id, content }, updatedBy) => {
    try {
        const comment = await PostComment.findOne({
            where: { id },
            include: {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
            attributes: ["id", "content", "createdAt"],
            order: [
                ["createdAt", "asc"]
            ],
        });
        if (!comment) throw new BaseError(httpStatus.NOT_FOUND, "INVALID COMMENT");
        if (comment.user.id !== updatedBy)
            throw new BaseError(httpStatus.BAD_REQUEST, "ONLY OWNER CAN UPDATE");
        await comment.update({
            ...comment,
            content,
            updatedBy,
            updatedAt: Date.now() + 3600000 * 7,
        });
        return comment;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const removeCommentOfPost = async({ id }, updatedBy) => {
    try {
        const comment = await PostComment.findOne({
            where: { id },
            include: {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
        });
        if (!comment) throw new BaseError(httpStatus.NOT_FOUND, "INVALID COMMENT");
        if (comment.user.id !== updatedBy)
            throw new BaseError(httpStatus.BAD_REQUEST, "ONLY OWNER CAN DELETE");
        const post = await Post.findOne({ where: { id: comment.postID } });
        await comment.update({
            isDelete: true,
        });
        await post.update({
            comments: post.comments > 0 ? post.comments - 1 : 0,
        });
        return comment;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};