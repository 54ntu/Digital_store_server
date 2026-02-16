import { Table, Column, Model, DataType } from "sequelize-typescript"
import { PaymentMethod, paymentStatus } from "../globals/types/index.js"



@Table({
    tableName: "payment",
    modelName: "Payment",
    timestamps: true
})


class Payment extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.ENUM(PaymentMethod.COD, PaymentMethod.card, PaymentMethod.khalti),
        defaultValue: PaymentMethod.COD
    })
    declare paymentMethod: string

    @Column({
        type: DataType.ENUM(paymentStatus.Paid, paymentStatus.Unpaid),
        defaultValue: paymentStatus.Unpaid
    })

    declare paymentStatus: string

}

export default Payment;