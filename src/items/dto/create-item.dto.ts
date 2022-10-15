import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'окно', description: 'Название предемета' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 'wefewwf.jpg', description: 'Изображение предемета' })
  @IsString({ message: 'Должно быть строкой' })
  readonly image: string;

  @ApiProperty({ example: 4, description: 'Количество товара' })
  @IsInt({ message: 'Должно быть числом' })
  readonly count: number;

  @ApiProperty({ example: 4000, description: 'Цена товара' })
  @IsInt({ message: 'Должно быть числом' })
  readonly price: number;

  @ApiProperty({ example: 4, description: 'id категории' })
  @IsInt({ message: 'Должно быть числом' })
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
