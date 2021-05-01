import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {AuthController} from "./auth/auth.controller";
import { MailsModule } from './mails/mails.module';
import { TargetsModule } from './targets/targets.module';
import { GroupsModule } from './groups/groups.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
        MailsModule,
        TargetsModule,
        GroupsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
