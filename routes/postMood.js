import express from "express";
import * as postMoodController from "../controllers/postMood.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.post("/:postID", verifyToken, postMoodController.handlePostMoods);

export default router;