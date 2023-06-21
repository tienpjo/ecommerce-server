import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseService } from 'src/shared/base.service';
import { User } from './models/user.model';
import { LoginUserDto } from './models/standard-models/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './models/standard-models/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { JwtPayload } from 'src/auth/jwt-payload.model';
import { AuthService } from 'src/auth/auth.service';
import { LoginResponseView } from './models/standard-models/login-response.model';
import { Mapper } from '@automapper/core';
import { UserDto } from './models/standard-models/user.dto';
import { InjectMapper } from '@automapper/nestjs';
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.getModelName)
    private readonly _userModel: ModelType<User>,
    @Inject(forwardRef(() => AuthService))
    readonly _authService: AuthService,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    super();
    this._model = _userModel;
  }

  async signUp(user: RegisterUserDto) {
    const { username, password, firstName, lastName } = user;
    console.log(user);
    const saltRounds = 10;
    const userExist = await this.findOne({ username });
    if (userExist) {
      throw new ConflictException('Username already exist');
    }
    const newUser = User.creatModel();
    newUser.username = username.trim().toLowerCase();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    const salt = await bcrypt.genSalt(saltRounds);
    newUser.password = await bcrypt.hash(password, salt);

    try {
      const result = await this.createDocument(newUser);
      return result.toJSON() as User;
    } catch (err) {
      if (err.code === '11000') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(userVm: LoginUserDto): Promise<LoginResponseView> {
    const { username, password } = userVm;

    const user = await this.findOne({ username });
    if (!user) {
      throw new ConflictException('Username already exist');
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = {
      username: user.username,
      role: user.role,
    };
    //console.log(user);
    const accessToken = await this._authService.signPayload(payload);
    console.log(user);
    const userView: UserDto = this._mapper.map(user, User, UserDto);
    console.log(userView);
    return {
      token: accessToken,
      user: userView,
    };
  }
}
