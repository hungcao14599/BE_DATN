import * as postMoodService from "../services/postMood.service";
import BaseError from "../utils/BaseError";
import httpStatus from "http-status";

export const handlePostMoods = async (req, res) => {
  try {
    const mood = await postMoodService.handlePostMoods(req.params, req.user.id);
    res.json({
      data: mood,
      status: httpStatus[200],
      message: "HANDLE POST MOOD SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatus[500],
      message: "INTERNAL SERVER ERROR",
      error: error.message || error, // optional, giúp debug
    });
  }
};
