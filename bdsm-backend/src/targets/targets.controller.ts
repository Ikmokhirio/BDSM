import {Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {TargetsService} from "./targets.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../multerConfig";
import * as CSV from "csv-string"
import {AuthGuard} from "@nestjs/passport";

@Controller('/api/targets')
export class TargetsController {

    constructor(private readonly targetsService: TargetsService) {

    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(FileInterceptor('targets', multerOptions))
    async uploadTargets(@UploadedFile() file: Express.Multer.File,@Request() req) {
        let data = file.buffer.toString('utf-8');
        const arr = CSV.parse(data);
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr[i].length; j++) {

                await this.targetsService.createTarget(arr[i][j],req.user);

            }

        }
    }


}
