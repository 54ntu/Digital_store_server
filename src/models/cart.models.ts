import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript"
import { Product } from "./product.model.js";
import  User from "./user.model.js";

@Table({
    tableName: "carts",
    modelName: "Cart",
    timestamps: true
})


class Cart extends Model {

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare userId: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare productId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1
  })
  declare quantity: number;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Product)
  declare product: Product;
}


export default Cart;