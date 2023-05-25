import { ApiProperty } from '@nestjs/swagger';
import { BaseModule } from 'src/shared/base.model';
import { User } from '../user.model';
import { UserRole } from '../user-role.model';
import { AutoMap } from '@automapper/classes';

export class UserDto extends BaseModule<User> {
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
