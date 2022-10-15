import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumberString, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'окно', description: 'Название предемета' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 4, description: 'Количество товара' })
  @IsNumberString()
  readonly count: number;

  @ApiProperty({ example: 4000, description: 'Цена товара' })
  @IsNumberString()
  readonly price: number;

  @ApiProperty({ example: 4, description: 'id категории' })
  @IsNumberString()
  readonly categoryId: number;

  @ApiProperty({
    example: ['высота', 'ширина'],
    description: 'Массив атрибутов',
  })
  @IsArray({ message: 'Должно быть массивом' })
  readonly properties: string[];

  @ApiProperty({ example: ['1150', '700'], description: 'Массив значений' })
  @IsArray({ message: 'Должно быть массивом' })
  readonly values: string[];
}
