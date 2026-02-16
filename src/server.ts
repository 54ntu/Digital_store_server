import "dotenv/config";
import app from "./app.js";
import { envConfig } from "./config/config.js";
import { sequelize } from "./dbconfig/db.js";
import adminSeeder from "./adminSeeder.js";
import { Server } from "socket.io"
import jwt from "jsonwebtoken";
import User from "./models/user.model.js";
import Order from "./models/ordermodel.js";




try {
    sequelize.authenticate().then(() => {
        console.log("Database connected successfully");
        adminSeeder();  //seed the admin user when the server starts
        const server = app.listen(envConfig.port, () => {
            console.log(`Server is running on port ${envConfig.port}`);

        })

        const io = new Server(server, {
            cors: {
                origin: ["http://localhost:5173",]
            }
        })

        let onlineUsers: { socketId: string, userId: string, role: string }[] = [];
        const addToOnlineUsers = (socketId: string, userId: string, role: string) => {
            onlineUsers.filter((user) => user.userId !== userId)
            onlineUsers.push({ socketId, userId, role })

        }

        io.on("connection", (socket) => {
            // console.log("client connected successfully!")
            const { token } = socket.handshake.auth
            // console.log("token", token)
            if (token) {
                jwt.verify(token, envConfig.accessTokenSecret as string, async (err, result: any) => {
                    if (err) {
                        socket.emit("error", err)
                    } else {
                        const userData = await User.findByPk(result.userId)
                        if (!userData) {
                            socket.emit("error", "No user found with that token")
                            return;
                        }

                        //we have to store userid
                        addToOnlineUsers(socket.id, result.userId, userData.role)
                    }

                })

            } else {
                socket.emit("error", "invalid token")
            }

            socket.on("updateOrderStatus", async (data) => {
                const { status, orderId, userId } = data
                const isUserExist = onlineUsers.find((user) => user.userId == userId)
                //update the orderstatus based on the data received
                await Order.update(
                    {
                        orderStatus: status
                    }, {
                    where: {
                        id: orderId
                    }
                }
                )
                if (isUserExist) {
                    io.to(isUserExist.socketId).emit("success", "order status has been updated successfully")

                } else {
                    socket.emit("error", "user is not online")
                }
            })

        })


    });
} catch (error) {
    console.log("Unable to connect to the database:", error);
}




