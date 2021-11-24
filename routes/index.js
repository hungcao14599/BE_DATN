import express from "express";
import authRouter from "./auth";
import userRouter from "./user";
import postRouter from "./post";
import postMoodRouter from "./postMood";
import postCommentRouter from "./postComment";
import friendRouter from "./friend";
import groupRouter from "./group";

var router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/post-mood", postMoodRouter);
router.use("/api/post-comment", postCommentRouter);
router.use("/api/friend", friendRouter);
router.use("/api/groups", groupRouter);

export default router;