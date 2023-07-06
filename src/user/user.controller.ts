import { Body, Controller, UseGuards, Get, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Post } from '@nestjs/common';
import { RegisterUserDto } from './models/standard-models/register-user.dto';
import { UserDto } from './models/standard-models/user.dto';
import { LoginUserDto } from './models/standard-models/login-user.dto';
import { LoginResponseView } from './models/standard-models/login-response.model';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { User } from './models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('signup')
  @ApiCreatedResponse({ type: UserDto })
  async register(@Body() bodyUser: RegisterUserDto): Promise<any> {
    //  const { username, password, firstName, lastName } = bodyUser;
    const newUser = this._userService.signUp(bodyUser);
    return newUser;
  }

  @Post('signin')
  @ApiCreatedResponse({ type: UserDto })
  async login(@Body() bodyUser: LoginUserDto): Promise<LoginResponseView> {
    return this._userService.signIn(bodyUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUser(@GetUser() user: User): {
    username: string;
    role: string;
  } {
    return { username: user.username, role: user.role };
  }
}
