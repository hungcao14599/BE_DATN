import express from "express";
import * as messageController from "../controllers/message.controller";
import { verifyToken } from "../middleware/authJWT";

const router = express.Router();

router.post("/", messageController.createMessage);
router.get(
  "/content/:id",

  messageController.fetchMessageByChatId
);

export default router;
