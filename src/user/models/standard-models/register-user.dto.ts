import { LoginUserDto } from './login-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class RegisterUserDto extends LoginUserDto {
  @ApiPropertyOptional({ example: 'Tran' })
  firstName?: string;
  @ApiPropertyOptional({ example: 'Tien' })
  lastName?: string;
}
