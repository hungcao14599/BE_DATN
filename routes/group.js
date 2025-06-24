import express from "express";
import * as groupController from "../controllers/group.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Quản lý nhóm (Group)
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Lấy tất cả nhóm
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách các nhóm
 */
router.get("/", verifyToken, groupController.fetchAllGroups);

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Tạo nhóm mới
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nhóm được tạo thành công
 */
router.post("/", verifyToken, groupController.addGroup);

/**
 * @swagger
 * /api/groups:
 *   put:
 *     summary: Cập nhật thông tin nhóm
 *     tags: [Groups]
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
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/", verifyToken, groupController.updateInfoGroup);

/**
 * @swagger
 * /api/groups/join-group/{groupID}:
 *   post:
 *     summary: Người dùng gửi yêu cầu tham gia nhóm
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gửi yêu cầu tham gia thành công
 */
router.post("/join-group/:groupID", verifyToken, groupController.userJoinGroup);

/**
 * @swagger
 * /api/groups/approval:
 *   post:
 *     summary: Admin phê duyệt người dùng tham gia nhóm
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupID:
 *                 type: integer
 *               userID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Phê duyệt thành công
 */
router.post(
  "/approval",
  verifyToken,
  groupController.groupAdminApprovalUserJoinGroup
);

/**
 * @swagger
 * /api/groups/members/{groupID}:
 *   get:
 *     summary: Lấy danh sách thành viên trong nhóm
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách thành viên trong nhóm
 */
router.get("/members/:groupID", groupController.fetchMemberInGroup);

/**
 * @swagger
 * /api/groups/users-join/{groupID}:
 *   get:
 *     summary: Lấy danh sách người dùng đã gửi yêu cầu tham gia nhóm
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách người chờ phê duyệt
 */
router.get(
  "/users-join/:groupID",
  verifyToken,
  groupController.fetchUserJoinGroup
);

/**
 * @swagger
 * /api/groups/groups-info:
 *   get:
 *     summary: Lấy danh sách nhóm người dùng đã tham gia
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách nhóm người dùng đang tham gia
 */
router.get("/groups-info", verifyToken, groupController.fetchGroupsOfUser);

/**
 * @swagger
 * /api/groups/other-groups:
 *   get:
 *     summary: Lấy danh sách các nhóm khác người dùng chưa tham gia
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách nhóm chưa tham gia
 */
router.get(
  "/other-groups",
  verifyToken,
  groupController.fetchOtherGroupsOfUser
);

/**
 * @swagger
 * /api/groups/group-item/{id}:
 *   get:
 *     summary: Lấy thông tin nhóm theo ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin nhóm
 */
router.get("/group-item/:id", groupController.fetchGroupById);

/**
 * @swagger
 * /api/groups/member-join/{id}:
 *   get:
 *     summary: Lấy danh sách người mới tham gia nhóm
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách thành viên mới
 */
router.get("/member-join/:id", groupController.fetchMemberJoinGroup);

/**
 * @swagger
 * /api/groups/files/{groupID}:
 *   get:
 *     summary: Lấy danh sách ảnh/tệp trong nhóm
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách tệp trong nhóm
 */
router.get("/files/:groupID", groupController.fetchImgByGroupId);


export default router;
