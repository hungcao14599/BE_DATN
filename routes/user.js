import express from "express";
import * as userController from "../controllers/user.controller";
import { verifyToken, verifyTokenRole } from "../middleware/authJWT";

const router = express.Router();

router.get("/", userController.fetchAllUsers);
router.get("/num-of-users", userController.fetchNumOfUserByMonth);

router.get("/name/:username", userController.fetchUserByName);
router.get("/info", verifyToken, userController.fetchUserByID);
router.put("/avatar", verifyToken, userController.uploadAvatar);
router.put("/cover-image", verifyToken, userController.uploadCoverImage);

router.put("/update", verifyToken, userController.updateUserInfo);
router.post("/verify", userController.verifyAccount);
router.get("/find", userController.findUserByKeyword);
router.get("/images/:username", userController.fetchImgByUsername);
router.get("/image/:image", userController.fetchImage);

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
