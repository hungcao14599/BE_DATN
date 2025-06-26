import * as userService from "../services/user.service";
import BaseError from "../utils/BaseError";
import httpStatus from "http-status";
import { User } from "../model";
const fs = require("fs");

export const fetchNumOfUserByMonth = async (req, res) => {
  try {
    const data = await userService.fetchNumOfUserByMonth();
    res.json({
      data: data,
      status: httpStatus[200],
      message: "FETCH NUM OF USERS BY MONTHS SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers(req.body);
    res.json({
      data: users,
      status: httpStatus[200],
      message: "FETCH ALL USERS SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const fetchUserByName = async (req, res) => {
  try {
    const user = await userService.fetchUserByName(req.params);
    res.json({
      data: user,
      status: httpStatus[200],
      message: "FETCH USERS SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const fetchUserByID = async (req, res) => {
  try {
    const user = await userService.fetchUserByID(req.user.id);
    res.json({
      data: user,
      status: httpStatus[200],
      message: "FETCH USERS SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const user = await userService.updateUserInfo(req.user.id, req.body);
    res.json({
      data: user,
      status: httpStatus[200],
      message: "Update user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const account = await userService.verifyAccount(req.body);
    res.json({
      data: account,
      status: httpStatus[200],
      message: "ACTIVATED ACCOUNT SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }

  try {
    const { email, verifyCode } = req.body;
    const account = await User.findOne({ where: { email } });
    if (!account) {
      res.status(404).send({ status: 404, message: "Invalid Email" });
    } else if (account.status !== 0) {
      res.status(404).send({ status: 405, message: "Account Activated" });
    } else if (account.verifyCode !== verifyCode) {
      res.status(404).send({ status: 405, message: "Incorrect Code" });
    } else {
      await account.update({
        status: 1,
        updatedAt: Date.now() + 3600000 * 7,
      });

      return res.json({
        status: 200,
        message: "Account Activation Successful",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const findUserByKeyword = async (req, res) => {
  try {
    const users = await userService.findUserByKeyword(req.query);
    res.json({
      data: users,
      status: httpStatus[200],
      message: "FETCH USERS SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const fetchImgByUsername = async (req, res) => {
  try {
    const images = await userService.fetchImgByUsername(req.params);
    res.json({
      data: images,
      status: httpStatus[200],
      message: "FETCH IMAGES SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const setBlockUser = async (req, res) => {
  try {
    const user = await userService.setBlockUser(req.params.id);
    res.json({
      data: user,
      status: httpStatus[200],
      message: "BLOCKED USER SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const setUnBlockUser = async (req, res) => {
  try {
    const user = await userService.setUnBlockUser(req.params.id);
    res.json({
      data: user,
      status: httpStatus[200],
      message: "UNBLOCKED USER SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const fetchAllBlockedUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllBlockedUsers(req.body);
    res.json({
      data: users,
      status: httpStatus[200],
      message: "FETCH ALL BLOCKED USER SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const uploadAvatar = async (req, res) => {
  const user = await userService.uploadAvatar(req, res);
  res.json({
    status: 200,
    data: user,
    message: "Avatar Upload Successfully",
  });
};

export const uploadCoverImage = async (req, res) => {
  const user = await userService.uploadCoverImage(req, res);
  res.json({
    status: 200,
    data: user,
    message: "Cover Image Upload Successfully",
  });
};

export const fetchImage = async (req, res) => {
  const image = req.params.image;
  fs.readFile(`./assets/image/user/${image}`, (err, data) => {
    // res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.writeHead(200);
    res.end(data);
  });
};
