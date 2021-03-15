import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {Users} from "../users/entities/users.entity";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);

        if (user && await user.comparePassword(pass)) {
            return user;
        }

        return null;
    }

    async validateToken(token: any): Promise<any> {
        return await this.userService.findOne(token.id);
    }

    async createToken(user: Users) {
        const expiresIn = process.env.TOKEN_EXPIRE_TIME;

        const accessToken = jwt.sign({
                id: user.id,
                email: user.email
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn
            });

        return {
            expiresIn,
            accessToken
        };
    }

}
