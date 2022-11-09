import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryModel implements Category {
  @ApiProperty({ example: 1, description: 'id категории' })
  id: number;

  @ApiProperty({ example: 'окна', description: 'Название категории' })
  title: string;
}
