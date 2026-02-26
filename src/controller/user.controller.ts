import type { Request, Response } from "express";
import User from "../models/user.model.js";
import EncryptDecryptPassHandler from "../handler/authController.js";
import jwt from "jsonwebtoken";
import { v4 as uuid4 } from 'uuid'
import { envConfig } from "../config/config.js";
import generateOtp from "../handler/generateOtp.js";
import sendMail from "../handler/sendMail.js";
import PasswordResetSession from "../models/passwordResetSession.model.js";
import { hashValue } from "../handler/otpHash.js";

class UserController {
    static async register(req: Request, res: Response) {

        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "username, email and password are required!!!!"
            })
        }

        //check if user already exists or not

        const data = await User.findOne({
            where: {
                email: email
            }
        })


        if (data) {
            return res.status(400).json({
                message: "user with the given email already exists  !!!!    "
            })
        }

        const hashedPassword = await EncryptDecryptPassHandler.hashPassword(password)

        const user = await User.create({
            email,
            password: hashedPassword,
            username
        })


        if (user) {
            await sendMail({
                to: email,
                subject: "Welcome to Digital Dokan!",
                text: `Congralution ${username}, you have been successfully registered on Digital Dokan. We are excited to have you on board!`
            })

            return res.status(201).json({
                message: "user registered successfully!!!!",
                data: user
            })
        }






    }


    static async login(req: Request, res: Response) {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email or password is required!!!!!"
            })
        }

        //if email or username and password is given then check for user exist or not
        const [user] = await User.findAll({
            where: {

                email: email

            }
        })

        // console.log("user : ", user)
        if (!user) {
            return res.status(404).json({
                message: "user with the given email does not exist!!!!!!"
            })
        }

        const isPasswordMatched = await EncryptDecryptPassHandler.comparePassword(password, user.password);
        // console.log(isPasswordMatched)

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "invalid credentials!!!!!"
            })

        }

        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },

            envConfig.accessTokenSecret,
            {
                expiresIn: envConfig.accessTokenExpiry

            }
        )

        // console.log("accessToken : ", accessToken)

        //before we set token into the cookie we have to set some options
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict' as const
        }


        return res.status(200)
            .cookie('accessToken', accessToken, cookieOptions)
            .json({
                message: "user logged in successfully!!!!!",
                accessToken: accessToken
            })

    }


    static async logout(req: Request, res: Response) {

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict' as const,
        }

        return res.status(200)
            .clearCookie('accessToken', options)
            .json({
                message: "user logged out successfully!!!!!"
            })


    }

    static async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "email is required!!!!!"
            })
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(404).json({
                message: "user with the given email does not exist!!!!!!"
            })
        }

        const otp = generateOtp()
        const resetSessionId = uuid4();

        await PasswordResetSession.create({
            id: resetSessionId,
            userId: user.id,
            otpHash: hashValue(otp.toString()),
            expiresAt: Date.now() + 10 * 60 * 1000 //10 minutes
        })


        await sendMail({
            to: email,
            subject: "Password Reset OTP - Digital Dokan",
            text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes. If you did not request a password reset, please ignore this email.`
        })



        return res.status(200).json({
            message: "OTP has been sent to your email address!!!!!",
            resetSessionId: resetSessionId
        })


    }



    static async verifyOtp(req: Request, res: Response) {
        const { otp, resetSessionId } = req.body;
        const session = await PasswordResetSession.findOne({
            where: {
                id: resetSessionId
            }
        })

        if (!session || session.expiresAt < Date.now()) {
            return res.status(400).json({
                message: "OTP expired or invalid!!!!!"
            })
        }

        if (session.attempts >= 5) {
            return res.status(429).json({
                message: "Too many attempts."
            })
        }

        if (hashValue(otp) !== session.otpHash) {
            session.attempts += 1;
            await session.save();
            return res.status(400).json({
                message: "Invalid OTP!!!!!"
            })
        }

        session.verified = true;
        await session.save();
        return res.status(200).json({
            message: "OTP verified successfully!!!!!"
        })

    }

    static async resetPassword(req: Request, res: Response) {
        const { newPassword, confirmPassword, resetSessionId } = req.body;
        const session = await PasswordResetSession.findOne({
            where: {
                id: resetSessionId,
                verified: true
            },
            include: User

        })

        if (!session) {
            return res.status(400).json({
                message: "Invalid or unverified password reset session."
            })
        }

        session.user.password = await EncryptDecryptPassHandler.hashPassword(newPassword);
        await session.user.save();
        await session.destroy();

        return res.status(200).json({
            message: "Password has been reset successfully."
        })
    }


}



export default UserController;