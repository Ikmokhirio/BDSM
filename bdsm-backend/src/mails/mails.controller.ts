import {Body, Controller, Get, HttpCode, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {MailsService} from './mails.service';
import {AuthGuard} from "@nestjs/passport";
import {CreateMailDto} from "./dto/create-mail.dto";

@Controller('/api/mails')
export class MailsController {
    constructor(private readonly mailsService: MailsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(200)
    async createNewMail(@Request() req, @Body() createMailDto: CreateMailDto) {
        return await this.mailsService.createNewMail(createMailDto, req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllMails(@Request() req) {
        return (await this.mailsService.getAllMails(req.user));
    }
}
