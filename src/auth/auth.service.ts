import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.model';
@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  constructor(
    @Inject(forwardRef(() => UserService))
    readonly _userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.jwtOptions = { expiresIn: '12h' };
    this.jwtKey = configService.get<string>('JWT_KEY');
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this._userService.findOne({
      username: payload.username.toLowerCase(),
    });
  }
}
