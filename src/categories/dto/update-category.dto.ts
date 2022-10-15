import { IsInt } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsInt({ message: 'Должно быть числом' })
  readonly id: number;
}
