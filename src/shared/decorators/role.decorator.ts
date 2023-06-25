import { SetMetadata } from '@nestjs/common/decorators';
import { UserRole } from 'src/user/models/user-role.model';

export const Roles = (...roles: UserRole[]) => {
  SetMetadata('roles', roles);
};
