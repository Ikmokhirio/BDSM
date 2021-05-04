import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Targets} from "./entities/targets.entity";
import {Users} from "../users/entities/users.entity";
import {Groups} from "../groups/entities/groups.entity";
import {MailerService} from "../mailer/mailer.service";

@Injectable()
export class TargetsService {

    constructor(@InjectRepository(Targets)
                private targetsRepository: Repository<Targets>,
                @InjectRepository(Groups)
                private groupsRepository: Repository<Groups>,
                private mailerService: MailerService
    ) {
    }

    async createTarget(email: string, user: Users): Promise<Targets> {

        let target: Targets = await this.targetsRepository.findOne(
            {
                relations: ["groups"],
                where: {
                    email: email
                }
            }
        )

        let group: Groups = await this.groupsRepository.findOne({ // Find group, corresponding to this owner
            relations: ["owner"],
            where: {
                owner: {
                    id: user.id
                }
            }
        })

        if (!target) { // If no such email in database => add it
            const newTarget = this.targetsRepository.create({
                email: email,
                groups: [group]
            })
            return await this.targetsRepository.save(newTarget);
        }

        if (target.groups) { // If email is present => add new group to it's groups list
            target.groups.push(group);
        } else {
            target.groups = [group];
        }

        return (await this.targetsRepository.save(target));

    }

}
