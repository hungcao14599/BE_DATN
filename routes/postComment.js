import express from "express";
import * as postCommentController from "../controllers/postComment.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PostComments
 *   description: Quản lý bình luận bài viết
 */

/**
 * @swagger
 * /api/post-comment/{postID}:
 *   get:
 *     summary: Lấy danh sách bình luận theo bài viết
 *     tags: [PostComments]
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
 *         description: Danh sách bình luận
 */
router.get("/:postID", verifyToken, postCommentController.fetchCommentByPost);

/**
 * @swagger
 * /api/post-comment:
 *   post:
 *     summary: Thêm bình luận vào bài viết
 *     tags: [PostComments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postID:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bình luận đã được thêm
 */
router.post("/", verifyToken, postCommentController.addCommentToPost);

/**
 * @swagger
 * /api/post-comment:
 *   put:
 *     summary: Cập nhật nội dung bình luận
 *     tags: [PostComments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bình luận đã được cập nhật
 */
router.put("/", verifyToken, postCommentController.updateCommentOfPost);

/**
 * @swagger
 * /api/post-comment/delete/{id}:
 *   put:
 *     summary: Xóa bình luận khỏi bài viết
 *     tags: [PostComments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bình luận đã bị xóa
 */
router.put(
  "/delete/:id",
  verifyToken,
  postCommentController.removeCommentOfPost
);


export default router;