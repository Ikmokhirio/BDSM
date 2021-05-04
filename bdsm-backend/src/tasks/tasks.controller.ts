import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';

import {AuthGuard} from "@nestjs/passport";
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task-dto";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createNewTask(@Req() request, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.createNewTask(request.user, createTaskDto);
    }
}
