import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {Users} from "./entities/users.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>) {
    }

    async findAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: string): Promise<Users> {
        return await this.usersRepository.findOne(id);
    }

    async findByUsername(username: string): Promise<Users> {
        return await this.usersRepository.findOne({
            where: {
                username: username
            }
        });
    }

    async createUser(createUserDto: CreateUserDto) {

        console.log(createUserDto);
        try {
            const user = await this.usersRepository.create(createUserDto);
            await this.usersRepository.save(user);
            return {
                result: "Success"
            }
        } catch (e) {
            console.error(e);
            return {
                message: "Error"
            }
        }


    }

}