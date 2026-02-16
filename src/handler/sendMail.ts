import nodemailer from "nodemailer";
import { envConfig } from "../config/config.js";
import { subscribe } from "node:diagnostics_channel";


interface IData {
    to: string;
    subject: string;
    text: string;

}


const sendMail = async (Data: IData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envConfig.useremail,
            pass: envConfig.useremailpassword


        }
    })

    const mailOptions = {
        from: "Digital Dokan <" + envConfig.useremail + ">",
        to: Data.to,
        subject: Data.subject,
        text: Data.text
    }


    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("error while sending mail", error);

    }

}

export default sendMail;