import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript"
import { Product } from "./product.model.js"

@Table({
    tableName: "categories",
    modelName: "Category",
    timestamps: true,
})



export class Category extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare categoryName: string

    @HasMany(() => Product)
    declare products: Product[];
}