import express from "express";
import * as userController from "../controllers/user.controller";
import { verifyToken, verifyTokenRole } from "../middleware/authJWT";

const router = express.Router();

router.get("/", userController.fetchAllUsers);
router.get("/name/:username", userController.fetchUserByName);
router.put("/update", verifyToken, userController.updateUserInfo);

export default router;