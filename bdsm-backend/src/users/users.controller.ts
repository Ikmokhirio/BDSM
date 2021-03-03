import {Controller, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    createUser(): string {
        return this.usersService.createUser();
    }

    @Get()
    findAll(): string {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): string {
        return this.usersService.findOne(params.id);
    }
}