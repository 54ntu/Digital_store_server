import type { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { emitWarning } from "node:process";

class ProductController {
    // Controller methods will be implemented here

    static async createProduct(req: Request, res: Response): Promise<void> {


        // Implementation for creating a product
        const { productName, description, price, productStock, discount, categoryId } = req.body;

        if (!productName || !description || !price || !productStock || !categoryId) {
            res.status(500).json({
                message: "All fields are required😡😡😡😡😡😡😡"
            })
        }

        //image url will be handled separately  
        const productImageUrl = req.file?.filename;
        // console.log(productImageUrl)
        const finalProductImageUrl = "http://localhost:4000/" + productImageUrl;


        if (!productImageUrl) {
            res.status(500).json({
                message: "image name is not received🤬🤬🤬🤬🤬🤬🤬🤬🤬"
            })
        }

        //check whether the same category and same product exist already or not
        const isProductExist = await Product.findOne({
            where: {
                productName,
                categoryId

            }
        })

        if (isProductExist) {
            isProductExist.productStock += Number(productStock)
            await isProductExist.save();

            res.status(200).json({
                message: "product stock increamented successfully!!!",
                product: isProductExist
            })
            return;
        }

        //if not new product is existed then we have to create new product

        const newProduct = await Product.create({

            productName,
            description,
            price,
            productStock,
            productImageUrl: finalProductImageUrl,
            discount,
            categoryId
        })

        res.status(201).json({
            message: "new product created successfully😊😊😊😊😊😊🤩🤩",
            product: newProduct
        })


    }

    static async getProduct(req: Request, res: Response): Promise<void> {

        const products = await Product.findAll();
        if (products.length === 0) {
            res.status(404).json({
                message: "product not found😒😒😒😒😒😒"
            })
            return;
        }

        res.status(200).json({
            message: "product data fetched successfully😊😊😊😊😊😊",
            product: products
        })
        return;

    }

    static async updateProduct(req: Request, res: Response): Promise<void> {

        const { productId } = req.params

        const { productName, description, price, productStock, discount } = req.body

        const productImageUrl = req.file?.filename;

        //check whether the product with the given id exist or not
        const isProductExist = await Product.findOne({
            where: { id: productId }
        })

        if (!isProductExist) {
            res.status(404).json({
                message: "product with the given id doesnot exists"
            })
            return;
        }

        //if exist then just update the products

        await isProductExist.update({
            productName,
            description,
            price,
            discount,
            productImageUrl

        })

        res.status(201).json({
            message: "product updated successfully🤩🤩🤩🤩🤩🤩",
            isProductExist
        })
        return;

    }


    static async updateProductStock(req: Request, res: Response): Promise<void> {

        const { productId } = req.params;
        const { quantity } = req.body;


        if (!quantity || isNaN(quantity)) {
            res.status(400).json({
                message: "Quantity must be a number"
            })
            return
        }

        const product = await Product.findOne({
            where: {
                id: productId
            }
        })

        if (!product) {
            res.status(404).json({
                message: "product not found"
            })
            return;
        }

        const newStock = product.productStock + Number(quantity);

        if (newStock < 0) {
            res.status(400).json({
                message: "Insufficient stock"
            })
            return;
        }

        product.productStock = newStock;
        await product.save()

        res.status(200).json({
            message: "product stock updated successfully😊😊😊😊😊",
            product

        })


    }

    static async getSingleProduct(req: Request, res: Response): Promise<void> {

        const { id: productId } = req.params;

        if (!productId || Array.isArray(productId)) {
            res.status(400).json({
                message: "Invalid product ID"
            })
            return;
        }

        //find the product with the given id
        const product = await Product.findByPk(productId, {
            include: ["category"]
        })

        if (!product) {
            res.status(404).json({
                message: "product with the given ID doesnot exists"
            })
            return;
        }

        res.status(200).json({
            message: "product data is fetched successfully😎😎😎😎😎",
            product
        })
        return;

    }

    static async deleteProduct(req: Request, res: Response): Promise<void> {


        const { id } = req.params

        //validate the id is number or not
        if (!id || Array.isArray(id)) {
            res.status(400).json({
                message: "invalid product id"
            })
            return;
        }

        const datas = await Product.findAll({
            where: {
                id: id
            }
        })

        if (datas.length === 0) {
            res.status(404).json({
                message: "product data not found😒😒😒😒😒"
            })
            return;
        }

        await Product.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({
            message: "product deleted successfully😎😎😎😎😎"
        })
        return;

    }

}



export default ProductController;