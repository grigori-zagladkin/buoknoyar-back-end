import { ApiProperty } from '@nestjs/swagger';
import { Item } from '@prisma/client';

export class ItemModel implements Item {
  @ApiProperty({ example: 1, description: 'id товара' })
  id: number;
  @ApiProperty({ example: 'окно 1920*1000', description: 'название товара' })
  title: string;
  @ApiProperty({ example: 3, description: 'Количество товара' })
  count: number;
  @ApiProperty({ example: 10000, description: 'Цена товара' })
  price: number;
  @ApiProperty({
    example: 'wefregergeg.jpg',
    description: 'Изображение товара',
  })
  image: string;
  @ApiProperty({
    example: 3,
    description: 'id категории к которой относится товар',
  })
  categoryId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
