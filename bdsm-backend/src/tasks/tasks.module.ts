import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Groups} from "../groups/entities/groups.entity";
import {Tasks} from "./entities/tasks.entity";
import {Mails} from "../mails/entities/mails.entity";
import {Users} from "../users/entities/users.entity";
import {TasksController} from "./tasks.controller";
import {TasksService} from "./tasks.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tasks, Mails, Groups, Users])],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService]
})
export class TasksModule {
}
