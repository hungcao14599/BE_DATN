import express from "express";
import * as chatController from "../controllers/chat.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.get("/", chatController.fetchAllChats);
router.get("/chat-user", verifyToken, chatController.fetchChatsByUserId);

export default router;
