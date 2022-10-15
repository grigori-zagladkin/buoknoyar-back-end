import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends CreateItemDto {
  @ApiProperty({ example: 1, description: 'id товара' })
  @IsInt({ message: 'Должно быть числом' })
  readonly id: number;
}
