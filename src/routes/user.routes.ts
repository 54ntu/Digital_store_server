import express from "express";
import UserController from "../controller/user.controller.js";
import UserMiddleware from "../middlewares/auth.middleware.js";
import errorHandler from "../handler/errorHandler.js";
const router = express.Router();


router.route("/register").post(errorHandler(UserController.register));
router.route("/login").post(errorHandler(UserController.login));
router.route("/logout").post(UserMiddleware.isUserLoggedIn, errorHandler(UserController.logout));
router.route("/forgot-password").post(errorHandler(UserController.forgotPassword));
router.route("/verify-otp").post(errorHandler(UserController.verifyOtp))
router.route("/reset-password").post(errorHandler(UserController.resetPassword));


export default router;