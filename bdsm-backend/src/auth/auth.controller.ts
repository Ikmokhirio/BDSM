import {Body, Controller, HttpCode, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('registration')
    @HttpCode(200)
    async registration(@Body() createUserDto: CreateUserDto) {
        const token = await this.authService.registerUser(createUserDto);
        if (token) {
            return {
                username: createUserDto.username,
                email: createUserDto.email,
                avatar: createUserDto.avatar,
                expiresIn: token.expiresIn,
                accessToken: token.accessToken,
                statusCode: token.statusCode
            };
        }
        throw new UnauthorizedException();
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {

        if (req.user) {
            let token = await this.authService.createToken(req.user);

            return {
                username: req.user.username,
                email: req.user.email,
                avatar: req.user.avatar,
                expiresIn: token.expiresIn,
                accessToken: token.accessToken,
                statusCode: token.statusCode
            };
        }
        throw new UnauthorizedException();
    }
}
