import express from "express";
import { sendMessage,getMessages, sendFriendRequest } from "../controller/message.controller.js";
import isAuthenticate from '../middleware/auth.js'
const router = express.Router();

router.route("/send/:id").post(isAuthenticate ,sendMessage);
router.route("/:id").get(isAuthenticate ,getMessages);
router.route("/sendfriendrequest/:id").post(isAuthenticate ,sendFriendRequest);

export default router;
