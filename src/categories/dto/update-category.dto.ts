import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiProperty({ example: 1, description: 'id категории' })
  @IsInt({ message: 'Должно быть числом' })
  readonly id: number;
}
