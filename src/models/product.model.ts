import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { Category } from "./category.model.js"

@Table({
    tableName: "products",
    modelName: "Product",
    timestamps: true,
})


export class Product extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true

    })
    declare productName: string

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare description: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare price: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare productStock: number


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare productImageUrl: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,

    })
    declare discount: number


    //this set categoryID
    @ForeignKey(() => Category)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })

    declare categoryId: string


    //relation
    @BelongsTo(() => Category)
    declare category: Category

}