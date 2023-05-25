import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginResponseView {
  @ApiProperty()
  token: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
