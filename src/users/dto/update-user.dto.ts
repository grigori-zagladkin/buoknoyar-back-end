import { IsInt } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsInt({ message: 'Должно быть числом' })
  readonly id: number;
}
