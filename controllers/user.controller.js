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