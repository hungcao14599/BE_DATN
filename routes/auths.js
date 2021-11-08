import express from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
// router.post("/resendCode", authController.resendCode);
// router.post("/logout", authController.logout);

export default router;