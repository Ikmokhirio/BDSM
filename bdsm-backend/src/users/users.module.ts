import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./entities/users.entity";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {GroupsModule} from "../groups/groups.module";

@Module({
    imports: [
        GroupsModule,
        TypeOrmModule.forFeature([Users])
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {
}
