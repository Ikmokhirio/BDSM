import {Module} from '@nestjs/common';
import {MailerService} from './mailer.service';
import {MailsConsumer} from "./MailsConsumer";

@Module({
    providers: [MailerService, MailsConsumer],
    exports: [MailerService]
})
export class MailerModule {
}
