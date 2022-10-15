import { ApiProperty } from '@nestjs/swagger';
import { Attribute } from '@prisma/client';

export class PropertyModel implements Attribute {
  @ApiProperty({ example: 1, description: 'id свойства' })
  id: number;
  @ApiProperty({ example: 'Высота', description: 'Название атрибута' })
  name: string;
}
