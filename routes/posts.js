import express from "express";
import * as postController from "../controllers/post.controller";
import { verifyToken, verifyTokenRole } from "../middleware/authJWT";

const router = express.Router();

router.get("/", verifyToken, postController.fetchAllPostsOfUser);
router.post("/", verifyToken, postController.addPost);

router.get("/post-item/:id", verifyToken, postController.fetchPostByUserID);

export default router;