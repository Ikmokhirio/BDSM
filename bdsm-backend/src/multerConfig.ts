import {HttpException} from "@nestjs/common";
import {constants} from "http2";
import {extname} from 'path'



export const multerOptions = {

    // limits: {
    //     fileSize: +process.env.MAX_FILE_SIZE
    // },
    fileFilter: (req: any, file: any, cb: any) => {

        if(file.mimetype.match(/\/(text|plain)$/)) {
            cb(null,true);
        } else {
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`,constants.HTTP_STATUS_BAD_REQUEST));
        }
    }
}