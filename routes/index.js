import express from "express";
import authRouter from "./auths";
import userRouter from "./users";
var router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);

module.exports = router;