import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';

import {AuthGuard} from "@nestjs/passport";
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task-dto";

@Controller('/api/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createNewTask(@Req() request, @Body() createTaskDto: CreateTaskDto) {
        const task = this.tasksService.createNewTask(request.user, createTaskDto);

        if (task) {
            return ({
                statusCode: 200,
                message: null
            });
        }

        return ({
            statusCode: 500,
            message: "Unknown error"
        })
    }
}
