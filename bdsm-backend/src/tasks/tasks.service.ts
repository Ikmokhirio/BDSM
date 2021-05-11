import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Tasks} from "./entities/tasks.entity";
import {Repository} from "typeorm";
import {CreateTaskDto} from "./dto/create-task-dto";
import {Mails} from "../mails/entities/mails.entity";
import {Users} from "../users/entities/users.entity";
import {Groups} from "../groups/entities/groups.entity";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";
import {Targets} from "../targets/entities/targets.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectQueue('mails')
        private mailQueue: Queue,
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
            // console.log(userInstance);

            const mail = await this.mailsRepository.save(
                await this.mailsRepository.create({
                    user: userInstance,
                    body: createTaskDto.body
                })
            );
            // console.log(mail);

            const findedGroups = await this.groupsRepository.find({
                relations: ["targets", "owner"],
                where: {
                    owner: {
                        id: user.id
                    }
                }
            });
            // console.log(findedGroups);
            if (!findedGroups) {
                return undefined;
            }

            const tempTask = await this.tasksRepository.create({
                mail: mail,
                finished: false,
                currentIndex: 0,
                status: "Ready",
                groups: findedGroups
            });

            // console.log(tempTask)

            const task = await this.tasksRepository.save(tempTask);

            // console.log("CREATING TASK");
            findedGroups.forEach((group) => {
                if (createTaskDto.groupsIds.includes(Number(group.id))) {
                    this.mailQueue.add({
                        targets: group.targets,
                        body: mail.body,
                        username: createTaskDto.username,
                        password: createTaskDto.password,

                    }, {
                        removeOnComplete: true
                    });
                }
            })
            // console.log("FINISHED");

            return task;

        } catch (e) {
            console.error(e);
            return undefined;
        }
    }
}
