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
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};
