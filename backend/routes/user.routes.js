import express from 'express'
const router  = express.Router();
import {getUsersForSidebar} from '../controller/getUser.controller.js'
import isAuthenticate from '../middleware/auth.js';

router.route('/').get(isAuthenticate,getUsersForSidebar)

export default router