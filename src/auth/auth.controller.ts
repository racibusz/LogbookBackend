import { Controller, Post, Body, Get, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() body: { email: string; password: string }, @Session() session: Record<string, any>) {
        return this.authService.login(body.email, body.password, session);
    }

    @Post('logout')
    logout(@Session() session: Record<string, any>) {
        return this.authService.logout(session);
    }
    @Post('register')
    register(@Body() body: { email: string; password: string }) {
        return this.authService.register(body.email, body.password);
    }
    @Get()
    state(@Session() session: Record<string, any>) {
        return session.isLoggedIn ? { message: 'Logged in', user: session.user } : { message: 'Not logged in' };
    }
}