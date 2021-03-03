import {Injectable} from "@nestjs/common";

@Injectable()
export class UsersService {

    findAll(): string {
        return 'Test message';
    }

    findOne(id: string) : string {
        return `Users with id ${id}`
    }

    createUser() : string {
        return `Creating user in database`;
    }

}