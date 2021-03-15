import {Body, Controller, Get, HttpCode, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    @HttpCode(200)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

    @Get()
    async findAll(): Promise<string> {
        let users = await this.usersService.findAll();
        return JSON.stringify(users);
    }

    @Get(':id')
    async findOne(@Param() params): Promise<string> {
        let users = await this.usersService.findOne(params.id);
        return JSON.stringify(users);
    }
}