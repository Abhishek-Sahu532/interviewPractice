import express from "express";
import { loginUser, logoutUser, registerNewUser, getUserDetails } from "../controllers/user.controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = express.Router()

router.route('/register').post(registerNewUser)
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJwt, logoutUser)
router.route('/me').get(verifyJwt, getUserDetails)


export default router