import express from "express";
import * as messageController from "../controllers/message.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Quản lý tin nhắn
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Gửi tin nhắn mới
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *               senderId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tin nhắn đã được tạo
 */
router.post("/", messageController.createMessage);

/**
 * @swagger
 * /api/messages/content/{id}:
 *   get:
 *     summary: Lấy tất cả tin nhắn trong cuộc trò chuyện theo ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách tin nhắn
 */
router.get("/content/:id", messageController.fetchMessageByChatId);


export default router;
