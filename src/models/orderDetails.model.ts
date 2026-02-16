import { Table, Model, Column, DataType } from "sequelize-typescript"


@Table({
    tableName: "order_details",
    modelName: "OrderDetail",
    timestamps: true
})

export class OrderDetail extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare quantity: number
}