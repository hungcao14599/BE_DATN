import * as groupService from "../services/group.service";
import BaseError from "../utils/BaseError";
import httpStatus from "http-status";

export const fetchAllGroups = async (req, res) => {
  try {
    const groups = await groupService.fetchAllGroups(req.query);
    res.json({
      data: groups,
      status: httpStatus[200],
      message: "FETCH ALL GROUPS SUCCESSFULLY",
    });
  } catch (error) {
    // next(error);
    console.log(error);
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
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
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const fetchImgByGroupId = async (req, res) => {
  try {
    const images = await groupService.fetchImgByGroupId(req.params);
    res.json({
      data: images,
      status: httpStatus[200],
      message: "FETCH IMAGES IN GROUP",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};
