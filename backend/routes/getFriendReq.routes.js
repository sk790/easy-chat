import express from "express";
import isAuthenticate from '../middleware/auth.js'
import  {getFriendRequests}  from "../controller/getFriendReq.js";
const router = express.Router();


router.route("/getfriendrequest").get(isAuthenticate ,getFriendRequests);

export default router;