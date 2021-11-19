import * as postService from "../services/post.service";
import BaseError from "../utils/baseError";
import httpStatus from "http-status";

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
            status: httpStatus[200],
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
        await postService.deletePost(req.params);
        res.json({
            status: httpStatus[200],
            message: "DELETE POST SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};