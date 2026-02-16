import bcrypt from "bcrypt"
class EncryptDecryptPassHandler {

    static async hashPassword(password: string): Promise<string> {

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;

        } catch (error) {
            throw new Error("error while hashing password");

        }
    }


    static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            const ismatch = await bcrypt.compare(plainPassword, hashedPassword);
            return ismatch;

        } catch (error) {
            throw new Error("error while comparing password");

        }
    }



}


export default EncryptDecryptPassHandler;