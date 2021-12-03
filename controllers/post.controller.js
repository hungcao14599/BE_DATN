import * as postService from "../services/post.service";
import BaseError from "../utils/baseError";
import httpStatus from "http-status";
import { Image, Post, PostComment, PostLike, User } from "../model";
import { multipleUploadFile } from "../middleware/uploadMulter";
const fs = require("fs");

export const fetchAllPosts = async(req, res) => {
    try {
        const posts = await postService.fetchAllPosts(req.query, req.user.id);
        res.json({
            data: posts,
            status: httpStatus[200],
            message: "FETCH ALL POSTS SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};
export const fetchPostByPostID = async(req, res) => {
    try {
        const { id } = req.params;
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
                    where: { createdBy: req.user.id },
                    required: false,
                },
                {
                    model: Image,
                    attributes: ["id", "name", "url"],
                },
            ],
        });
        if (!post) {
            res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "INVALID POST",
            });
        }
        return res.json({
            data: post,
            status: httpStatus[201],
            message: "Fetch Posts Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
export const addPost = async(req, res) => {
    try {
        const { content, type, groupID } = req.body;
        const post = await Post.create({
            content,
            type,
            createdBy: req.user.id,
            groupID: type === 3 ? groupID : null,
            createdAt: Date.now() + 3600000 * 7,
            isDelete: false,
            likes: 0,
            comments: 0,
        });
        return res.json({
            data: post,
            status: httpStatus[201],
            message: "Add Posts Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updatePost = async(req, res) => {
    try {
        const post = await postService.updatePost(req.body, req.user.id);
        res.json({
            data: post,
            status: httpStatus[200],
            message: "UPDATE POST SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const deletePost = async(req, res) => {
    try {
        const post = await postService.deletePost(req.params, req.user.id);
        res.json({
            data: post,
            status: httpStatus[200],
            message: "DELETE POST SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchAllPostByUserName = async(req, res) => {
    try {
        const posts = await postService.fetchAllPostByUserName(
            req.params,
            req.query,
            req.user.id
        );
        res.json({
            data: posts,
            status: httpStatus[200],
            message: "FETCH ALL POST BY USERNAME SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchAllPostByGroupID = async(req, res) => {
    try {
        const posts = await postService.fetchAllPostByGroupID(
            req.params,
            req.query,
            req.user.id
        );
        res.json({
            data: posts,
            status: httpStatus[200],
            message: "FETCH ALL POST BY GROUPID SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchImageInPost = async(req, res) => {
    try {
        const image = req.params.image;
        fs.readFile(`./assets/image/post/${image}`, (err, data) => {
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(data);
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const uploadPostImages = async(req, res) => {
    try {
        const post = await postService.uploadPostImages(req, res);
        res.json({
            status: 200,
            data: post,
            message: "Success",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};