import express from "express";
import * as friendController from "../controllers/friend.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: Quản lý quan hệ bạn bè
 */

/**
 * @swagger
 * /api/friend:
 *   get:
 *     summary: Lấy toàn bộ bảng bạn bè (friend table) của người dùng
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách bạn bè từ bảng friend
 */
router.get("/", verifyToken, friendController.fetchAllUserInFriendTable);

/**
 * @swagger
 * /api/friend/not-friend:
 *   get:
 *     summary: Lấy danh sách người dùng chưa phải bạn bè với người dùng hiện tại
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người chưa kết bạn
 */
router.get(
  "/not-friend",
  verifyToken,
  friendController.fetchAllNotFriendOfUserByID
);

/**
 * @swagger
 * /api/friend/user-friend:
 *   get:
 *     summary: Lấy danh sách bạn bè của người dùng hiện tại
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bạn bè
 */
router.get(
  "/user-friend",
  verifyToken,
  friendController.fetchAllFriendOfUserByID
);

/**
 * @swagger
 * /api/friend/add/{id}:
 *   post:
 *     summary: Gửi lời mời kết bạn tới người dùng
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID người dùng cần kết bạn
 *     responses:
 *       200:
 *         description: Gửi lời mời kết bạn thành công
 */
router.post("/add/:id", verifyToken, friendController.addFriend);

/**
 * @swagger
 * /api/friend/approval:
 *   get:
 *     summary: Lấy danh sách lời mời kết bạn chờ duyệt
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách lời mời kết bạn
 */
router.get("/approval", verifyToken, friendController.fetchAllUserApprovalByID);

/**
 * @swagger
 * /api/friend/approval:
 *   post:
 *     summary: Chấp nhận lời mời kết bạn
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requesterId:
 *                 type: integer
 *                 description: ID người gửi lời mời kết bạn
 *     responses:
 *       200:
 *         description: Kết bạn thành công
 */
router.post("/approval", verifyToken, friendController.approvalFriend);

export default router;
