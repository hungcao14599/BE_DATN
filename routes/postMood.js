import express from "express";
import * as postMoodController from "../controllers/postMood.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PostMoods
 *   description: Quản lý mood (thích, không thích) bài viết
 */

/**
 * @swagger
 * /api/post-mood/{postID}:
 *   post:
 *     summary: Thêm mood cho bài viết (thích, không thích)
 *     tags: [PostMoods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mood đã được thêm vào bài viết
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc có lỗi
 *       404:
 *         description: Bài viết không tồn tại
 */

router.post("/:postID", verifyToken, postMoodController.handlePostMoods);

export default router;
