import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/shared/base.model';
import { User } from '../user.model';
import { UserRole } from '../user-role.model';
import { AutoMap } from '@automapper/classes';

export class UserDto extends BaseModel<User> {
  @ApiProperty()
  @AutoMap()
  username: string;
  @ApiProperty()
  @AutoMap()
  firstName?: string;

  @ApiProperty()
  @AutoMap()
  lastName?: string;

  @ApiProperty()
  @AutoMap()
  fullName?: string | any;

  @ApiProperty({ enum: UserRole })
  @AutoMap()
  role?: UserRole;
}
