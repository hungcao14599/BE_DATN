import * as friendService from "../services/friend.service";
import BaseError from "../utils/baseError";
import httpStatus from "http-status";

export const fetchAllUserInFriendTable = async(req, res) => {
    try {
        const allFriends = await friendService.fetchAllUserInFriendTable();
        res.json({
            data: allFriends,
            status: httpStatus[200],
            message: "FETCH ALL USER IN FRIEND TABLE SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchAllFriendOfUserByID = async(req, res) => {
    try {
        const allFriends = await friendService.fetchAllFriendOfUserByID(
            req.user.id,
            req.query
        );
        res.json({
            data: allFriends,
            status: httpStatus[200],
            message: "FETCH ALL FRIEND OF USER BY ID SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};
export const addFriend = async(req, res) => {
    try {
        await friendService.addFriend(req.user.id, req.params.id);
        res.json({
            status: httpStatus[200],
            message: "ADD FRIEND SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};
export const approvalFriend = async(req, res) => {
    try {
        await friendService.approvalFriend(req.user.id, req.body);
        res.json({
            status: httpStatus[200],
            message: "HANDLE APPROVAL FRIEND SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchAllNotFriendOfUserByID = async(req, res) => {
    try {
        const allNotFriends = await friendService.fetchAllNotFriendOfUserByID(
            req.user.id,
            req.query
        );
        res.json({
            data: allNotFriends,
            status: httpStatus[200],
            message: "FETCH ALL NOT FRIEND OF USER BY ID SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchAllUserApprovalByID = async(req, res) => {
    try {
        const allApporvalFriends = await friendService.fetchAllUserApprovalByID(
            req.user.id,
            req.query
        );
        res.json({
            data: allApporvalFriends,
            status: httpStatus[200],
            message: "FETCH ALL APPROVAL FRIEND OF USER BY ID SUCCESSFULLY",
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};