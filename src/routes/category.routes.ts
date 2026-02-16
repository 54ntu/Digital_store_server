import express from "express"
import CategoryController from "../controller/category.controller.js";
import UserMiddleware from "../middlewares/auth.middleware.js";
import errorHandler from "../handler/errorHandler.js";
const categoryRouter = express.Router();

categoryRouter.route("/add-category").post(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, errorHandler(CategoryController.addCategory));
categoryRouter.route("/get-categories").get(errorHandler(CategoryController.getAllCategories));
categoryRouter.route("/update-category/:id").patch(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, errorHandler(CategoryController.updateCategory));
categoryRouter.route("/delete-category/:id").delete(UserMiddleware.isUserLoggedIn, UserMiddleware.isAdmin, errorHandler(CategoryController.deleteCategory));


export default categoryRouter;

