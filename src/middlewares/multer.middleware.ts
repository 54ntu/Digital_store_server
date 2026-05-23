import type { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        cb(null, './src/uploads')
    },

    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        const uniqueSuffix = Date.now()

        const ext = path.extname(file.originalname); // extracts ".jpg" / ".png" etc.
        // console.log(`ext  is ${ext}`)
        // console.log(`file original name is ${file.fieldname}`)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }

})

const upload = multer({
    storage
})

export default upload;