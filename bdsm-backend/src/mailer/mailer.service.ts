import {Injectable} from '@nestjs/common';
import {generateYandexConfig, transportConfig} from "../transportConfigs";

const nodemailer = require("nodemailer");

@Injectable()
export class MailerService {
    constructor() {
    }

    async sendMessageSmtp(config: transportConfig, job) {
        let transporter = nodemailer.createTransport(config);

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

    async sendMessageApi(email: string, body: string, subject: string, senderMail: string) {
        console.log("Sending", body);
        console.log("To", email);
        console.log("Subject", subject);
        console.log("By", senderMail);

        // TODO : SEND EMAIl
    }
}
