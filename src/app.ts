import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import router from './routes/user.routes.js';
import categoryRouter from './routes/category.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';
import cartRouter from './routes/cart.routes.js';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["*"]
}))



//route for user
app.use("/api/v1/users", router)

//routes for category
app.use("/api/v1/categories", categoryRouter)

//route for product
app.use("/api/v1/products", productRouter)


//route for order
app.use("/api/v1/orders", orderRouter)


//route for cart 
app.use("/api/v1/carts", cartRouter)


export default app;