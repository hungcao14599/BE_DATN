import express from "express";
import * as chatController from "../controllers/chat.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Quản lý các cuộc trò chuyện
 */

/**
 * @swagger
 * /api/chat:
 *   get:
 *     summary: Lấy danh sách tất cả các cuộc trò chuyện
 *     tags: [Chats]
 *     responses:
 *       200:
 *         description: Danh sách các cuộc trò chuyện
 */
router.get("/", chatController.fetchAllChats);

/**
 * @swagger
 * /api/chat/chat-user:
 *   get:
 *     summary: Lấy cuộc trò chuyện của người dùng hiện tại
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách các cuộc trò chuyện của người dùng
 *       401:
 *         description: Không có quyền truy cập
 */
router.get("/chat-user", verifyToken, chatController.fetchChatsByUserId);

export default router;
