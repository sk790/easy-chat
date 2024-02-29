import express from "express";
import isAuthenticate from '../middleware/auth.js'
import  {acceptFriendRequest, getFriendRequests, sendFriendRequest}  from "../controller/friendReq.controller.js";
const router = express.Router();


router.route("/getfriendrequest").get(isAuthenticate ,getFriendRequests);
router.route("/sendfriendrequest/:id").post(isAuthenticate ,sendFriendRequest);
router.route("/acceptfriendrequest/:id").put(isAuthenticate,acceptFriendRequest);

export default router;