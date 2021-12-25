import * as groupService from "../services/group.service";
import BaseError from "../utils/BaseError";
import httpStatus from "http-status";

export const fetchAllGroups = async (req, res, next) => {
  try {
    const groups = await groupService.fetchAllGroups(req.query);
    res.json({
      data: groups,
      status: httpStatus[200],
      message: "FETCH ALL GROUPS SUCCESSFULLY",
    });
  } catch (error) {
    next(error);
  }
};
export const addGroup = async (req, res) => {
  try {
    const groups = await groupService.addGroup(req.user.id, req.body);
    res.json({
      data: groups,
      status: httpStatus[201],
      message: "Create a new group successfully",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const updateInfoGroup = async (req, res) => {
  try {
    const group = await groupService.updateInfoGroup(req.user.id, req.body);
    res.json({
      data: group,
      status: httpStatus[200],
      message: "UPDATE GROUP SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const userJoinGroup = async (req, res) => {
  try {
    const member = await groupService.userJoinGroup(
      req.user.id,
      req.params.groupID
    );
    res.json({
      data: member,
      status: httpStatus[200],
      message: "USER JOIN GROUP SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const groupAdminApprovalUserJoinGroup = async (req, res) => {
  try {
    const member = await groupService.groupAdminApprovalUserJoinGroup(
      req.user.id,
      req.body
    );
    res.json({
      data: member,
      status: httpStatus[200],
      message: "GROUP ADMIN HANDLE APPROVAL USER JOIN GROUP SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const fetchMemberInGroup = async (req, res) => {
  try {
    const members = await groupService.fetchMemberInGroup(
      req.params,
      req.query
    );
    res.json({
      data: members,
      status: httpStatus[200],
      message: "FETCH MEMBER IN GROUP SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const fetchUserJoinGroup = async (req, res) => {
  try {
    const members = await groupService.fetchUserJoinGroup(
      req.params,
      req.query
    );
    res.json({
      data: members,
      status: httpStatus[200],
      message: "FETCH USER JOIN GROUP SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const fetchGroupsOfUser = async (req, res) => {
  try {
    const groups = await groupService.fetchGroupsOfUser(req.user.id, req.query);
    res.json({
      data: groups,
      status: httpStatus[200],
      message: "FETCH GROUP INFO SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const fetchOtherGroupsOfUser = async (req, res) => {
  try {
    const groups = await groupService.fetchOtherGroupsOfUser(
      req.user.id,
      req.query
    );
    res.json({
      data: groups,
      status: httpStatus[200],
      message: "FETCH OTHER GROUP INFO SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const fetchGroupById = async (req, res) => {
  try {
    const group = await groupService.fetchGroupById(req.params);
    res.json({
      data: group,
      status: httpStatus[200],
      message: "FETCH GROUP INFO BY ID SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const fetchMemberJoinGroup = async (req, res) => {
  try {
    const members = await groupService.fetchMemberJoinGroup(
      req.params,
      req.query
    );
    res.json({
      data: members,
      status: httpStatus[200],
      message: "FETCH MEMBER JOIN GROUP",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};
