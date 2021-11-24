import express from "express";
import * as groupController from "../controllers/group.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.get("/", groupController.fetchAllGroups);
router.post("/", verifyToken, groupController.addGroup);
router.put("/", verifyToken, groupController.updateInfoGroup);
router.post("/join-group/:groupID", verifyToken, groupController.userJoinGroup);
router.post(
    "/approval",
    verifyToken,
    groupController.groupAdminApprovalUserJoinGroup
);
router.get(
    "/members/:groupID",
    verifyToken,
    groupController.fetchMemberInGroup
);

router.get(
    "/users-join/:groupID",
    verifyToken,
    groupController.fetchUserJoinGroup
);

router.get("/groups-info", verifyToken, groupController.fetchGroupsOfUser);
router.get(
    "/other-groups",
    verifyToken,
    groupController.fetchOtherGroupsOfUser
);

export default router;