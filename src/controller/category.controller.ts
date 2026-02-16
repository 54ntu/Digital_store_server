import type { Request, Response } from "express";
import { Category } from "../models/category.model.js";

class CategoryController {
    // Controller methods will be implemented here
    static async addCategory(req: Request, res: Response) {

        // console.log(req.body)
        // Implementation for adding a category
        const { categoryName } = req.body;


        if (!categoryName) {
            return res.status(400).json({ message: "Category name is required" });
        }

        //check whether category already exists
        const existingCategory = await Category.findAll({
            where: {
                categoryName: categoryName
            }
        })

        if (existingCategory.length > 0) {
            return res.status(409).json({ message: "Category already exists" });
        }

        const newCategory = await Category.create({
            categoryName: categoryName
        })


        if (!newCategory) {
            return res.status(500).json({ message: "Failed to create category" });
        }

        return res.status(201).json({
            message: "Category created successfully",
            category: newCategory
        })


    }

    static async getAllCategories(req: Request, res: Response) {

        const categories = await Category.findAll();
        if (categories.length === 0) {
            return res.status(404).json({
                message: "No categories found"
            })
        }
        return res.status(200).json({
            message: "Categories retrieved successfully",
            categories: categories
        })

    }

    static async updateCategory(req: Request, res: Response): Promise<void> {

        const { id } = req.params;
        const { categoryName } = req.body;
        if (!id || !categoryName) {
            res.status(400).json({
                message: "category id and name are required!!!!"
            })
            return;
        }

        //check whether the category of given id exists or not
        const existingCategory = await Category.findAll({
            where: {
                id: id
            }
        })



        if (existingCategory.length === 0) {
            res.status(404).json({
                message: "Category not found"
            })
            return;
        }

        //if found then update the existing category
        const updatedCategory = await Category.update({
            categoryName: categoryName

        }, {
            where: {
                id: id
            }
        })



        res.status(200).json({
            message: "category updated successfully",
            updatedCategory: updatedCategory
        })



    }

    static async deleteCategory(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        //first check whether category with given id exists or not
        const existingCategory = await Category.findAll({
            where: {
                id: id
            }
        })

        if (existingCategory.length === 0) {
            res.status(404).json({
                message: "Category not found"
            })
            return;
        }

        //if found then delete the category
        await Category.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({
            message: "Category deleted successfully!!!!!!!!!!!!!!!!!!!"
        })

    }

}

export default CategoryController;