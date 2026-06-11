import type { Request, Response } from "express";
import Cart from "../models/cart.models.js";
import { Product } from "../models/product.model.js";

interface userRequest extends Request {
    user?: {
        id: string
    }
}

class CartController {
    static async addToCart(req: userRequest, res: Response): Promise<void> {
        //userid

        const userid = req.user?.id
        console.log(`   user id from the request is : ${userid}`)
        const { productId, quantity } = req.body
        if (!productId || !quantity) {
            res.status(400).json({
                message: "productid and qunatity details are required😡😡😡😡😡"
            })
            return;
        }

        let cartItem = await Cart.findOne({
            where: {
                productId,
                userId: userid
            }
        })

        if (cartItem) {
            cartItem.quantity += quantity
            await cartItem.save()
        } else {

            cartItem=await Cart.create({
                userId: userid,
                productId,
                quantity
            })

        }
        res.status(200).json({
            message: "product successfully added to the cart🤩🤩🤩🤩",
            data:cartItem
        })
        return


    }


    static async getCartItems(req: userRequest, res: Response): Promise<void> {
        const userId = req.user?.id

        const cartItems = await Cart.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'productName', 'price', 'productImageUrl']
                }
            ]
        })

        if (cartItems.length === 0) {
            res.status(404).json({
                message: "cart items data not found😒😒😒😒😒"
            })
            return;
        }

        res.status(200).json({
            message: "data fetched successfully🤩🤩🤩",
            data: cartItems
        })
    }

    static async deleteMyCartItem(req: userRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { productId } = req.params
        //check if item exist or not 
        const productExist = await Product.findOne({
            where: {
                productId
            }
        })

        if (!productExist) {
            res.status(404).json({
                message: "product with the given product id doesnot exist on the cart"

            })
        }

        await Cart.destroy({
            where: {
                productId,
                userId
            }
        })

        res.status(200).json({
            message: "cart deleted successfully..."

        })
        return;


    }

    static async updateCartItemQuantiy(req: userRequest, res: Response): Promise<void> {
        const userId = req.user?.id;
        const { productId } = req.params
        const { quantity } = req.body
        if (!quantity) {
            res.status(400).json({
                message: "quantity is required!!!!!!"
            })
        }

        const cartItem = await Cart.findOne({
            where: {
                productId,
                userId
            }
        })

        if (!cartItem) {
            res.status(404).json({
                message: "product with the given Id does not exist in the cart"
            })
            return;
        }

        cartItem.quantity = quantity
        await cartItem.save();

        res.status(200).json({
            message: "quantity of the product is updated in the cart!!!!!!!!"
        })
        return;



    }
}


export default CartController;