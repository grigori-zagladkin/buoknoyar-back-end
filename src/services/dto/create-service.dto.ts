import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Демонтаж', description: 'Название услуги' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 'Мы можем ....', description: 'Описание услуги' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({ example: 'efregreggreg.jpg', description: 'Изображение' })
  @IsString({ message: 'Должно быть строкой' })
  readonly image: string;
}
