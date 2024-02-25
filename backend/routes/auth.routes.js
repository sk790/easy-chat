import express from "express";
import { Login, Logout, SignUp } from "../controller/auth.controller.js";
const router = express.Router();

router.route('/login').post(Login)
router.route('/signup').post(SignUp)
router.route('/logout').post(Logout)

export default router;
