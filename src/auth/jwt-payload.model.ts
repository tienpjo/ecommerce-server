import { UserRole } from 'src/user/models/user-role.model';

export interface JwtPayload {
  username: string;
  role: UserRole;
  date?: Date;
}
