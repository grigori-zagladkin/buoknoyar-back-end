import { ApiProperty } from '@nestjs/swagger';
import { Service } from '@prisma/client';

export class ServiceModel implements Service {
  @ApiProperty({ example: 1, description: 'id услуги' })
  id: number;

  @ApiProperty({ example: 'демонтаж', description: 'Название услуги' })
  title: string;

  @ApiProperty({ example: 'мы можем ...', description: 'Описание услуги' })
  description: string;

  @ApiProperty({
    example: 'ewfewfwfewf.jpg',
    description: 'Изображение услуги',
  })
  image: string;
}
