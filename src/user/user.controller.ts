import { Body, Controller, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Post } from '@nestjs/common';
import { RegisterUserDto } from './models/standard-models/register-user.dto';
import { User } from './models/user.model';
import { getModelForClass } from '@typegoose/typegoose';
import { UserDto } from './models/standard-models/user.dto';
import { LoginUserDto } from './models/standard-models/login-user.dto';
import { LoginResponseView } from './models/standard-models/login-response.model';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('signup')
  @ApiCreatedResponse({ type: UserDto })
  async register(@Body() bodyUser: RegisterUserDto): Promise<any> {
    const { username, password, firstName, lastName } = bodyUser;
    const newUser = this._userService.signUp(bodyUser);
    return newUser;
  }

  @Post('signin')
  @ApiCreatedResponse({ type: UserDto })
  async login(@Body() bodyUser: LoginUserDto): Promise<LoginResponseView> {
    return this._userService.signIn(bodyUser);
  }
}
