import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserModel implements User {
  @ApiProperty({ example: 1, description: 'id пользователя' })
  id: number;

  @ApiProperty({ example: 'wefwfewfgewfg', description: 'Логин' })
  login: string;

  @ApiProperty({ example: 'weffergregrgrreg', description: 'Пароль' })
  password: string;
}
