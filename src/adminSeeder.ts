import { envConfig } from "./config/config.js"
import EncryptDecryptPassHandler from "./handler/authController.js"
import User from "./models/user.model.js"

const adminSeeder = async () => {

    try {
        //first we have to check if admin with the given email already exists
        const data = await User.findAll({
            where: {
                email: envConfig.adminemail
            }
        })

        const encryptedPassword = await EncryptDecryptPassHandler.hashPassword(envConfig.adminpassword)

        if (data.length === 0) {
            await User.create({
                username: envConfig.adminusername,
                email: envConfig.adminemail,
                password: encryptedPassword,
                role: "admin"
            })
            console.log("Admin seeded successfully 😍😍😍");
        } else {
            console.log("Admin already exists 😎😎😎😎")
        }
    } catch (error) {
        console.error("Error seeding admin:", error);
    }
}


export default adminSeeder;