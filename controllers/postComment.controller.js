import * as postCommentService from "../services/postComment.service";
import BaseError from "../utils/BaseError";
import httpStatus from "http-status";

export const fetchCommentByPost = async (req, res) => {
  try {
    const comments = await postCommentService.fetchCommentByPost(
      req.params.postID,
      req.query
    );
    res.json({
      data: comments,
      status: httpStatus[200],
      message: "FETCH POST COMMENT SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const addCommentToPost = async (req, res) => {
  try {
    const comment = await postCommentService.addCommentToPost(
      req.body,
      req.user.id
    );
    res.json({
      data: comment,
      status: httpStatus[201],
      message: "ADD COMMENT TO POST SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const updateCommentOfPost = async (req, res) => {
  try {
    const comment = await postCommentService.updateCommentOfPost(
      req.body,
      req.user.id
    );
    res.json({
      data: comment,
      status: httpStatus[200],
      message: "UPDATE COMMENT OF POST SUCCESSFULLY",
    });
  } catch (error) {
    // throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};

export const removeCommentOfPost = async (req, res) => {
  try {
    const comment = await postCommentService.removeCommentOfPost(
      req.params,
      req.user.id
    );
    res.json({
      data: comment,
      status: httpStatus[200],
      message: "DELETE COMMENT OF POST SUCCESSFULLY",
    });
  } catch (error) {
    throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
  }
};
