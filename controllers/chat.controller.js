import * as chatService from "../services/chat.service";
import BaseError from "../utils/BaseError";
import httpStatus from "http-status";

export const fetchAllChats = async (req, res) => {
  try {
    const chats = await chatService.fetchAllChats();
    res.json({
      data: chats,
      status: httpStatus[200],
      message: "FETCH ALL CHAT SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const fetchChatsByUserId = async (req, res) => {
  try {
    const chats = await chatService.fetchChatsByUserId(req.user.id, req.query);
    res.json({
      data: chats,
      status: httpStatus[200],
      message: "FETCH ALL CHAT BY USERID SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};
