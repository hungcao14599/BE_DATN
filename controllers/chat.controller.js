import * as chatService from "../services/chat.service";
import BaseError from "../utils/baseError";
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
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
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
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};
