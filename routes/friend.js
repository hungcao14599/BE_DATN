import express from "express";
import * as friendController from "../controllers/friend.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.get("/", verifyToken, friendController.fetchAllUserInFriendTable);
router.get(
    "/not-friend",
    verifyToken,
    friendController.fetchAllNotFriendOfUserByID
);
router.get(
    "/user-friend",
    verifyToken,
    friendController.fetchAllFriendOfUserByID
);
router.post("/add/:id", verifyToken, friendController.addFriend);
router.get("/approval", verifyToken, friendController.fetchAllUserApprovalByID);
router.post("/approval", verifyToken, friendController.approvalFriend);

export default router;