import express from "express";
import * as postController from "../controllers/post.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.get("/", verifyToken, postController.fetchAllPosts);
router.get("/group-post", verifyToken, postController.fetchAllPostsInGroup);

router.post("/", verifyToken, postController.addPost);
router.put("/", verifyToken, postController.updatePost);
router.get("/post-item/:id", verifyToken, postController.fetchPostByPostID);
router.put("/delete/:id", verifyToken, postController.deletePost);
router.get(
  "/user/:username",
  verifyToken,
  postController.fetchAllPostByUserName
);
router.get(
  "/group-post/:groupID",
  verifyToken,
  postController.fetchAllPostByGroupID
);
router.get("/image/:image", postController.fetchImageInPost);

router.post("/upload/:id", verifyToken, postController.uploadPostImages);

export default router;
