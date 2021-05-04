import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {GroupsService} from "./groups.service";

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

}
