import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Groups} from "../groups/entities/groups.entity";
import {Tasks} from "./entities/tasks.entity";
import {Mails} from "../mails/entities/mails.entity";
import {Users} from "../users/entities/users.entity";
import {TasksController} from "./tasks.controller";
import {TasksService} from "./tasks.service";
import {BullModule} from "@nestjs/bull";

@Module({
    imports: [TypeOrmModule.forFeature([Tasks, Mails, Groups, Users]),
        BullModule.registerQueueAsync({
            name: "mails",
        })],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService]
})
export class TasksModule {
}
