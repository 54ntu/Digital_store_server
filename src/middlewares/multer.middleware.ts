import type { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        cb(null, './src/uploads')
    },

    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        const uniqueSuffix = Date.now()
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }

})

const upload = multer({
    storage
})

export default upload;