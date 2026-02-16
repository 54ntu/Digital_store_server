import express from "express";
import UserMiddleware from "../middlewares/auth.middleware.js";
import ProductController from "../controller/product.controller.js";
import upload from "../middlewares/multer.middleware.js";
import errorHandler from "../handler/errorHandler.js";
const productRouter = express.Router();

productRouter.route("/add-product").post(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, upload.single("productImage"), errorHandler(ProductController.createProduct));
productRouter.route("/get-product").get(errorHandler(ProductController.getProduct))
productRouter.route("/get-single").get(errorHandler(ProductController.getSingleProduct))
productRouter.route("/update-product").patch(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, upload.single("productImage"), errorHandler(ProductController.updateProduct))
productRouter.route("/update-stock").patch(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, errorHandler(ProductController.updateProductStock))
productRouter.route("/delete-product").delete(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, errorHandler(ProductController.deleteProduct))



export default productRouter;