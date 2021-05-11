import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mails/mails.module';
import { TargetsModule } from './targets/targets.module';
import { GroupsModule } from './groups/groups.module';
import { TasksModule } from './tasks/tasks.module';
import { MailerModule } from './mailer/mailer.module';
import {BullModule} from "@nestjs/bull";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        BullModule.forRoot({
            redis: {
                host: 'redis',
                port: 6379
            }
        }),
        BullModule.registerQueueAsync({
           name: "mails",
        }),
        UsersModule,
        AuthModule,
        MailsModule,
        TargetsModule,
        GroupsModule,
        TasksModule,
        MailerModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
