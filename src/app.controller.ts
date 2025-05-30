import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import session from 'express-session';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/test')
  getTest(@Session() session: Record<string, any>) {
    session.visits = session.visits || 0;
    session.visits++;
    return `You have visited this page ${session.visits} times`;
  }
}
