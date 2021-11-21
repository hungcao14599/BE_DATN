import express from "express";
import authRouter from "./auths";
import userRouter from "./users";
import postRouter from "./posts";
import postMoodRouter from "./postMood";

var router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/post-mood", postMoodRouter);

export default router;