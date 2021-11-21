import express from "express";
import * as postCommentController from "../controllers/postComment.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.get("/:postID", verifyToken, postCommentController.fetchCommentByPost);
router.post("/", verifyToken, postCommentController.addCommentToPost);
router.put("/", verifyToken, postCommentController.updateCommentOfPost);
router.put(
    "/delete/:id",
    verifyToken,
    postCommentController.removeCommentOfPost
);

export default router;