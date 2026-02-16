import { Table, Column, DataType, Model, AllowNull } from "sequelize-typescript"
import { OrderStatus } from "../globals/types/index.js";

@Table({
    tableName: "orders",
    modelName: "Order",
    timestamps: true
})


class Order extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 10],
                msg: "phone number must be 10 digits🤔🫥🫥🫥"
            }
        }



    })
    declare phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    declare shippingAddress: string


    @Column({
        type: DataType.FLOAT,
        allowNull: false

    })

    declare totalAmount: number


    @Column({
        type: DataType.ENUM(OrderStatus.Preparation, OrderStatus.Pending, OrderStatus.Delivered, OrderStatus.Cancelled),
        defaultValue: OrderStatus.Pending

    })
    declare orderStatus: string 



}

export default Order;