import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Tasks} from "./entities/tasks.entity";
import {Repository} from "typeorm";
import {CreateTaskDto} from "./dto/create-task-dto";
import {Mails} from "../mails/entities/mails.entity";
import {Users} from "../users/entities/users.entity";
import {Groups} from "../groups/entities/groups.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
        @InjectRepository(Mails)
        private mailsRepository: Repository<Mails>,
        @InjectRepository(Groups)
        private groupsRepository: Repository<Groups>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>) {
    }

    async createNewTask(user: Users, createTaskDto: CreateTaskDto) {
        try {

            const userInstance = await this.usersRepository.findOne({
                where: {
                    id: user.id
                }
            })

            const mail = await this.mailsRepository.save(
                await this.mailsRepository.create({
                    user: userInstance,
                    body: createTaskDto.body
                })
            );

            const findedGroups = await this.groupsRepository.findByIds(createTaskDto.groupsIds);

            if (!findedGroups) {
                return undefined;
            }

            const task = await this.tasksRepository.save(
                await this.tasksRepository.create({
                    mail: mail,
                    finished: false,
                    currentIndex: 0,
                    status: "Ready",
                    groups: findedGroups
                })
            );

            return task;

        } catch (e) {
            console.error(e);
            return undefined;
        }
    }
}
