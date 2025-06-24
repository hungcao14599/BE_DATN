import express from "express";
import * as postController from "../controllers/post.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Quản lý bài viết
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lấy tất cả bài viết
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bài viết
 */
router.get("/", verifyToken, postController.fetchAllPosts);

/**
 * @swagger
 * /api/posts/admin-role:
 *   get:
 *     summary: Lấy tất cả bài viết với quyền admin
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bài viết (admin)
 */
router.get("/admin-role", verifyToken, postController.fetchAllPostsRoleAdmin);

/**
 * @swagger
 * /api/posts/group-post:
 *   get:
 *     summary: Lấy tất cả bài viết trong nhóm
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bài viết nhóm
 */
router.get("/group-post", verifyToken, postController.fetchAllPostsInGroup);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Tạo bài viết mới
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               groupID:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bài viết đã được tạo
 */
router.post("/", verifyToken, postController.addPost);

/**
 * @swagger
 * /api/posts:
 *   put:
 *     summary: Cập nhật bài viết
 *     tags: [Posts]
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
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Bài viết đã được cập nhật
 */
router.put("/", verifyToken, postController.updatePost);

/**
 * @swagger
 * /api/posts/post-item/{id}:
 *   get:
 *     summary: Lấy chi tiết bài viết theo ID
 *     tags: [Posts]
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
 *         description: Chi tiết bài viết
 */
router.get("/post-item/:id", verifyToken, postController.fetchPostByPostID);

/**
 * @swagger
 * /api/posts/delete/{id}:
 *   put:
 *     summary: Xóa bài viết theo ID
 *     tags: [Posts]
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
 *         description: Đã xóa bài viết
 */
router.put("/delete/:id", verifyToken, postController.deletePost);

/**
 * @swagger
 * /api/posts/user/{username}:
 *   get:
 *     summary: Lấy tất cả bài viết theo username
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách bài viết của người dùng
 */
router.get(
  "/user/:username",
  verifyToken,
  postController.fetchAllPostByUserName
);

/**
 * @swagger
 * /api/posts/group-post/{groupID}:
 *   get:
 *     summary: Lấy bài viết theo ID nhóm
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách bài viết của nhóm
 */
router.get(
  "/group-post/:groupID",
  verifyToken,
  postController.fetchAllPostByGroupID
);

/**
 * @swagger
 * /api/posts/image/{image}:
 *   get:
 *     summary: Lấy hình ảnh bài viết
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: image
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về ảnh
 */
router.get("/image/:image", postController.fetchImageInPost);

/**
 * @swagger
 * /api/posts/upload/{id}:
 *   post:
 *     summary: Upload ảnh cho bài viết
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Upload thành công
 */
router.post("/upload/:id", verifyToken, postController.uploadPostImages);


export default router;
