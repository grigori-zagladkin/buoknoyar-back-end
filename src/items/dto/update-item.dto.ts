import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends CreateItemDto {
  @ApiProperty({ example: 1, description: 'id товара' })
  @IsNumberString({ message: 'Должно быть числом' })
  readonly id: number;
}
