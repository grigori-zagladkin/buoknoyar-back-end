import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Окна', description: 'Название категории' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;
}
