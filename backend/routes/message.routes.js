import express from "express";
import { sendMessage,getMessages} from "../controller/message.controller.js";
import isAuthenticate from '../middleware/auth.js'
const router = express.Router();

router.route("/send/:id").post(isAuthenticate ,sendMessage);
router.route("/:id").get(isAuthenticate ,getMessages);

export default router;
