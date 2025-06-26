import * as messageService from "../services/message.service";
import BaseError from "../utils/BaseError";
import httpStatus from "http-status";

export const fetchMessageByChatId = async (req, res) => {
  try {
    const messages = await messageService.fetchMessageByChatId(
      req.params.id,
      req.query
    );
    res.json({
      data: messages,
      status: httpStatus[200],
      message: "FETCH ALL MESSAGE SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};

export const createMessage = async (req, res) => {
  try {
    const message = await messageService.createMessage(req.body);
    res.json({
      data: message,
      status: httpStatus[201],
      message: "CREATE MESSAGE SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};
