import * as postService from "../services/post.service";
import BaseError from "../utils/baseError";
import httpStatus from "http-status";
const fs = require("fs");

export const fetchAllPostsOfUser = async(req, res) => {
    try {
        const posts = await postService.fetchAllPostsOfUser(req.query, req.user.id);
        res.json({
            data: posts,
            status: httpStatus[200],
            message: "FETCH ALL POSTS SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};
export const fetchPostByUserID = async(req, res) => {
    try {
        const post = await postService.fetchPostByUserID(
            req.user.id,
            req.params.id
        );
        res.json({
            data: post,
            status: httpStatus[200],
            message: "FETCH POST SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};
export const addPost = async(req, res) => {
    try {
        const post = await postService.addPost(req.body, req.user.id);
        res.json({
            data: post,
            status: httpStatus[201],
            message: "ADD POSTS SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
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