import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {GroupsService} from "./groups.service";
import {CreateGroupsDto} from "./dto/create-groups-dto";

@Controller('/api/groups')
export class GroupsController {

    constructor(private readonly groupsService: GroupsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllUserGroups(@Req() req) {
        return {
            statusCode: 200,
            groups: await this.groupsService.getAllUserGroups(req.user)
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createNewGroup(@Req() req, @Body() createGroupsDto: CreateGroupsDto) {
        return await this.groupsService.createNewGroup(req.user, createGroupsDto.name);
    }

}
