import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";
import User from "../models/user.model.js";


interface JwtPayload {
    id: string;
    email: string;
    role: string;

}


interface IextededRequest extends Request {
    user?: JwtPayload;
}


class UserMiddleware {
    static async isUserLoggedIn(req: IextededRequest, res: Response, next: NextFunction): Promise<void> {

        console.log("middleware hit vayo hoiii")
        try {


            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

            console.log(`token we got : ${token}`)
            if (!token) {
                res.status(401).json({
                    message: "access denied, unauthorized user!!!!!"
                })
            }

            const decodedToken = jwt.verify(token as string, envConfig.accessTokenSecret as string) as JwtPayload;
            if (!decodedToken) {
                res.status(401).json({
                    message: "invalid token 🤬🤬🤬🤬"
                })
            }

            const userData = await User.findByPk(decodedToken.id);

            if (!userData) {
                res.status(404).json({
                    message: "User not found 😢😢😢😢"
                })
                return;
            }

            req.user = {
                id: userData.id,
                email: userData.email,
                role: userData.role
            }

            next();
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }



    }

    static async isAdmin(req: IextededRequest, res: Response, next: NextFunction): Promise<void> {

        // console.log("req.user value is : ", req.user)

        try {
            if (!req.user) {
                res.status(401).json({
                    message: "Unauthorized user, please login first 😢😢😢😢"
                })
            }

            if (req.user?.role !== "admin") {
                res.status(403).json({
                    message: "Forbidden, you don't have permission to access this resource 😢😢😢😢"
                })

            }

            next();
        } catch (error) {
            res.status(500).json({
                message: "internal server error🥲🥲🥲🥲",
                error: error
            })

        }
    }
}

export default UserMiddleware;