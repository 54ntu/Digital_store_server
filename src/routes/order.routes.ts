import express from "express"
import UserMiddleware from "../middlewares/auth.middleware.js";
import OrderController from "../controller/order.controller.js";
const orderRouter = express.Router()


orderRouter.route("/create").post(UserMiddleware.isUserLoggedIn, OrderController.createOrder)

export default orderRouter;