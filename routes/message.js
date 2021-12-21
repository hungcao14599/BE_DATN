import express from "express";
import * as messageController from "../controllers/message.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.post("/", verifyToken, messageController.createMessage);
router.get("/message/:id", verifyToken, messageController.fetchMessageByChatId);

export default router;
