import express from "express";
import * as userController from "../controllers/user.controller";
import { verifyToken, verifyTokenRole } from "../middleware/authJWT";

const router = express.Router();

router.get("/", userController.fetchAllUsers);
router.get("/name/:keyword", userController.fetchUserByName);
router.put("/update", verifyToken, userController.updateUserInfo);
router.post("/verify", userController.verifyAccount);
router.get("/find", userController.findUserByKeyword);
router.get("/images/:keyword", userController.fetchImgByUsername);
router.post(
    "/block/:id",
    verifyTokenRole("ADMIN"),
    userController.setBlockUser
);
router.post(
    "/unblock/:id",
    verifyTokenRole("ADMIN"),
    userController.setUnBlockUser
);

router.get(
    "/block-users",
    verifyTokenRole(),
    userController.fetchAllBlockedUsers
);

export default router;