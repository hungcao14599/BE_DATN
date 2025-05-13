import express from "express";
import * as userController from "../controllers/user.controller";
import { verifyToken, verifyTokenRole } from "../middleware/authJWT";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */
router.get("/", userController.fetchAllUsers);

/**
 * @swagger
 * /api/users/num-of-users:
 *   get:
 *     summary: Lấy số lượng người dùng theo tháng
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về số lượng người dùng theo tháng
 */
router.get("/num-of-users", userController.fetchNumOfUserByMonth);

/**
 * @swagger
 * /api/users/name/{username}:
 *   get:
 *     summary: Tìm người dùng theo username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên người dùng cần tìm
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 */
router.get("/name/:username", userController.fetchUserByName);

/**
 * @swagger
 * /api/users/info:
 *   get:
 *     summary: Lấy thông tin người dùng theo token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về thông tin người dùng
 */
router.get("/info", verifyToken, userController.fetchUserByID);

/**
 * @swagger
 * /api/users/avatar:
 *   put:
 *     summary: Cập nhật avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/avatar", verifyToken, userController.uploadAvatar);

/**
 * @swagger
 * /api/users/cover-image:
 *   put:
 *     summary: Cập nhật ảnh bìa
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/cover-image", verifyToken, userController.uploadCoverImage);

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/update", verifyToken, userController.updateUserInfo);

/**
 * @swagger
 * /api/users/verify:
 *   post:
 *     summary: Xác minh tài khoản người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Xác minh thành công
 */
router.post("/verify", userController.verifyAccount);

/**
 * @swagger
 * /api/users/find:
 *   get:
 *     summary: Tìm kiếm người dùng theo từ khóa
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */
router.get("/find", userController.findUserByKeyword);

/**
 * @swagger
 * /api/users/images/{username}:
 *   get:
 *     summary: Lấy danh sách ảnh của người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên người dùng
 *     responses:
 *       200:
 *         description: Danh sách ảnh
 */

router.get("/images/:username", userController.fetchImgByUsername);

/**
 * @swagger
 * /api/users/image/{image}:
 *   get:
 *     summary: Lấy ảnh theo tên file
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: image
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên file ảnh
 *     responses:
 *       200:
 *         description: Ảnh được trả về
 */
router.get("/image/:image", userController.fetchImage);

/**
 * @swagger
 * /api/users/block/{id}:
 *   post:
 *     summary: Khóa người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Đã khóa người dùng
 */
router.post(
  "/block/:id",
  verifyTokenRole("ADMIN"),
  userController.setBlockUser
);

/**
 * @swagger
 * /api/users/unblock/{id}:
 *   post:
 *     summary: Mở khóa người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Đã mở khóa người dùng
 */
router.post(
  "/unblock/:id",
  verifyTokenRole("ADMIN"),
  userController.setUnBlockUser
);

/**
 * @swagger
 * /api/users/block-users:
 *   get:
 *     summary: Lấy danh sách người dùng bị khóa
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người dùng bị khóa
 */
router.get(
  "/block-users",
  verifyTokenRole(),
  userController.fetchAllBlockedUsers
);

export default router;
