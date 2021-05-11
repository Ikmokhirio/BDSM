import {Processor, Process} from '@nestjs/bull';
import {Job} from 'bull';
import {jobType} from '../jobInterface'
import {MailerService} from "./mailer.service";

@Processor('mails')
export class MailsConsumer {

    constructor(private readonly mailerService: MailerService) {

    }

    @Process() // TODO : split smtp and api??
    async processMail(job: Job<jobType>) {
        console.log("PROCESS ", job.data)
        job.data.targets.forEach(target => {
            this.mailerService.sendMessageApi(target.email, job.data.body, "TEST", "WHO?");
        })
    }
}