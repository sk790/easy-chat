import express from "express";
import { Logout,google } from "../controller/auth.controller.js";
const router = express.Router();

// router.route('/login').post(Login)
// router.route('/signup').post(SignUp)
router.route('/logout').post(Logout)
router.route('/google').post(google)

export default router;
