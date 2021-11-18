import * as userService from "../services/user.service";
import BaseError from "../utils/baseError";
import httpStatus from "http-status";

export const fetchAllUsers = async(req, res) => {
    try {
        const users = await userService.fetchAllUsers(req.body);
        res.json({
            data: users,
            status: httpStatus[200],
            message: "FETCH ALL USERS SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchUserByName = async(req, res) => {
    try {
        const user = await userService.fetchUserByName(req.params);
        res.json({
            data: user,
            status: httpStatus[200],
            message: "FETCH USERS SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const updateUserInfo = async(req, res) => {
    try {
        const user = await userService.updateUserInfo(req.user.id, req.body);
        res.json({
            data: user,
            status: httpStatus[200],
            message: "UPDATE USERS SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const verifyAccount = async(req, res) => {
    try {
        const account = await userService.verifyAccount(req.body);
        res.json({
            data: account,
            status: httpStatus[200],
            message: "ACTIVATED ACCOUNT SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const findUserByKeyword = async(req, res) => {
    try {
        const users = await userService.findUserByKeyword(req.query);
        res.json({
            data: users,
            status: httpStatus[200],
            message: "FETCH USERS SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchImgByUsername = async(req, res) => {
    try {
        const images = await userService.fetchImgByUsername(req.params);
        res.json({
            data: images,
            status: httpStatus[200],
            message: "FETCH IMAGES SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const setBlockUser = async(req, res) => {
    try {
        const user = await userService.setBlockUser(req.params.id);
        res.json({
            data: user,
            status: httpStatus[200],
            message: "BLOCKED USER SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const setUnBlockUser = async(req, res) => {
    try {
        const user = await userService.setUnBlockUser(req.params.id);
        res.json({
            data: user,
            status: httpStatus[200],
            message: "UNBLOCKED USER SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchAllBlockedUsers = async(req, res) => {
    try {
        const users = await userService.fetchAllBlockedUsers(req.body);
        res.json({
            data: users,
            status: httpStatus[200],
            message: "FETCH ALL BLOCKED USER SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};