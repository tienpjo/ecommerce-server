import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from './user/models/user.model';
import { keysIn } from 'lodash';

@Controller('root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  async getHello(): Promise<any> {
    return this.appService.getHello();
  }
}
