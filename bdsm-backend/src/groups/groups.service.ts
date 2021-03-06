import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Groups} from "./entities/groups.entity";
import {Repository} from "typeorm";
import {Users} from "../users/entities/users.entity";

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Groups)
        private groupsRepository: Repository<Groups>
    ) {
    }

    async createDefaultUserGroup(user: Users): Promise<Groups> {
        return await this.groupsRepository.save(await this.groupsRepository.create({
            owner: user,
            name: user.username // Create new group by user username
        }));
    }

    async getAllUserGroups(user: Users): Promise<any> {
        return await this.groupsRepository.find(
            {
                where: {
                    owner: {
                        id: user.id
                    }
                }
            }
        )
    }

    async createNewGroup(user: Users, name: string) {
        return await this.groupsRepository.save(await this.groupsRepository.create({
            owner: user,
            name: name
        }));
    }
}
