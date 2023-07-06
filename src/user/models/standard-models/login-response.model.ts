import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserRole } from '../user-role.model';

export class LoginResponseView {
  @ApiProperty()
  accessToken?: string;

  @ApiProperty()
  username: string;
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  fullName?: string | any;

  @ApiProperty({ enum: UserRole })
  role?: UserRole;
}
