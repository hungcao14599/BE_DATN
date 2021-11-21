import express from "express";
import * as postController from "../controllers/post.controller";
import { verifyToken, verifyTokenRole } from "../middleware/authJWT";

const router = express.Router();

router.get("/", verifyToken, postController.fetchAllPostsOfUser);
router.post("/", verifyToken, postController.addPost);
router.put("/", verifyToken, postController.updatePost);
router.get("/post-item/:id", verifyToken, postController.fetchPostByUserID);
router.put("/delete/:id", verifyToken, postController.deletePost);
router.get(
    "/user/:username",
    verifyToken,
    postController.fetchAllPostByUserName
);
router.get(
    "/group/:groupID",
    verifyToken,
    postController.fetchAllPostByGroupID
);
router.get("/image/:image", postController.fetchImageInPost);

export default router;