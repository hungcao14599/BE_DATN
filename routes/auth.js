import express from "express";
import * as authController from "../controllers/auth.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
// router.post("/resendCode", authController.resendCode);
router.post("/logout", verifyToken, authController.logout);

export default router;
