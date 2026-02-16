import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config.js";
import User from "../models/user.model.js";
import PasswordResetSession from "../models/passwordResetSession.model.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import Order from "../models/ordermodel.js";
import { OrderDetail } from "../models/orderDetails.model.js";
import Payment from "../models/payment.model.js";
import Cart from "../models/cart.models.js";

// const sequelize = new Sequelize(
//   envConfig.postgresUri as string,

//   {
//     dialect: "postgres",
//   },
// );


const sequelize = new Sequelize(envConfig.postgresUri as string, {
  models: [User, PasswordResetSession, Product, Category, Order, OrderDetail, Payment, Cart]    //this will automatically import all models defined in the models folder
})




sequelize.sync({ force: false, alter: true }).then(() => {    //this will create the table if it doesn't exist (and do nothing if it already exists)
  console.log("all models synced successfully");
})

//relations between Order and user
Order.belongsTo(User)
User.hasMany(Order)

//relation between order and orderdetails && product and orderdetails
OrderDetail.belongsTo(Order)
Order.hasMany(OrderDetail)

OrderDetail.belongsTo(Product)
Product.hasMany(OrderDetail)

//relation between payment and order
Payment.belongsTo(Order)
Order.hasOne(Payment)

//relation between Cart, userId and productId
Cart.belongsTo(User),
  User.hasOne(Cart)


Cart.belongsTo(Product)
Product.hasMany(Cart)



export { sequelize };
