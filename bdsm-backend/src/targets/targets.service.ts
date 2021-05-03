import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Targets} from "./entities/targets.entity";
import {Users} from "../users/entities/users.entity";
import {Groups} from "../groups/entities/groups.entity";

@Injectable()
export class TargetsService {

    constructor(@InjectRepository(Targets)
                private targetsRepository: Repository<Targets>,
                @InjectRepository(Groups)
                private groupsRepository: Repository<Groups>
    ) {
    }

    async createTarget(email: string, user: Users): Promise<Targets> {
        const newTarget = this.targetsRepository.create({
            email: email,
            groups: [await this.groupsRepository.findOne({
                relations: ["owner"],
                where: {
                    owner: {
                        id: user.id
                    }
                }
            })]
        })
        console.log(newTarget); // TODO : data check
        // newTarget.groups.push(defaultGroup);
        let newShit = await this.targetsRepository.save(newTarget);
        return newShit;
    }

}
