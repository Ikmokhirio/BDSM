import {Injectable} from '@nestjs/common';
import {generateYandexConfig} from "../transportConfigs";

const nodemailer = require("nodemailer");

@Injectable()
export class MailerService {
    constructor() {
    }

    async testMessage() {
        let transporter = nodemailer.createTransport(generateYandexConfig("login", "password"));

        try {
            await transporter.sendMail({
                from: `"Application test message" <dryavichev.i@b18-505.yaconnect.com>`,
                to: `"Lox" <dryvanya@yandex.ru>`,
                subject: "Hello",
                html: "<h1>THIS IS TEST MESSAGE</h1>"
            });
            return ({
                result: "SUCCESS"
            });
        } catch (e) {
            return e;
        }

    }
}
