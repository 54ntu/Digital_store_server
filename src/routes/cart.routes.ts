import express from "express"
import UserMiddleware from "../middlewares/auth.middleware.js";
import errorHandler from "../handler/errorHandler.js";
import CartController from "../controller/cart.controller.js";
const cartRouter = express.Router();

cartRouter.route("/").post(UserMiddleware.isUserLoggedIn, errorHandler(CartController.addToCart));
cartRouter.route("/").get(UserMiddleware.isUserLoggedIn, errorHandler(CartController.getCartItems))
cartRouter.route("/:productId").delete(UserMiddleware.isUserLoggedIn, errorHandler(CartController.deleteMyCartItem));
cartRouter.route("/:productId").patch(UserMiddleware.isUserLoggedIn,errorHandler(CartController.updateCartItemQuantiy))


export default cartRouter;