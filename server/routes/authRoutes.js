import express from "express";
const router = express.Router();
import {  signup , login , logout , changePassword} from "../controllers/authController.js";
import { protect , authorizeRole } from "../middlewares/authMiddleware.js";

router.post('/login' , login)
router.post('/signup' ,signup)
// router.post('/sendotp' , sendOTP)
router.post('/logout', logout)
router.post('/changepassword', protect , changePassword)

export default router;