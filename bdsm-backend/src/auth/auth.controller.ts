import {Controller, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        if(req.user) {
            return await this.authService.createToken(req.user);
        }
        throw new UnauthorizedException();
    }
}
