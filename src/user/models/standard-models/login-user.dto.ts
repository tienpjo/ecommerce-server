import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ required: true, minLength: 6 })
  username: string;

  @ApiProperty({ required: true, minLength: 6 })
  password: string;
}
