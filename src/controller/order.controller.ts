import type { Request, Response } from "express";
import Order from "../models/ordermodel.js";
import { OrderDetail } from "../models/orderDetails.model.js";
import Payment from "../models/payment.model.js";
import { PaymentMethod } from "../globals/types/index.js";

interface IProduct {
    productId: string,
    productQty: string
}

interface OrderRequest extends Request {
    user?: {
        id: string
    }
}


class OrderController {
    static async createOrder(req: OrderRequest, res: Response): Promise<void> {
        const { phoneNumber, shippingAddress, totalAmount, paymentMethod } = req.body
        const products: IProduct[] = req.body
        //get the logged in user from req.user
        const userId = req.user?.id
        if (!phoneNumber || !shippingAddress || !totalAmount || products.length == 0) {
            res.status(400).json({
                message: "please provide all the required fields!!!!!!"
            })
            return;
        }

        const isOrderCreated = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId: userId
        })

        products.forEach(async (product) => {
            await OrderDetail.create({
                quantity: product.productQty,
                productId: product.productId,
                orderId: isOrderCreated.id
            })
        })


        //for payment
        if (paymentMethod == PaymentMethod.COD) {
            await Payment.create({
                paymentMethod: paymentMethod,
                orderId: isOrderCreated.id
            })

        } else if (paymentMethod == PaymentMethod.card) {

        } else {

        }

    }

}

export default OrderController