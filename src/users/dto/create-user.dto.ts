import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(6, { message: 'Минимальная длина 6 символов' })
  @MaxLength(40, { message: 'Максимальная длина 40 символов' })
  readonly login: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly password: string;
}
