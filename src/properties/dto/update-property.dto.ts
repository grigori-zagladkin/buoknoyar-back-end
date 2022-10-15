import { IsInt } from 'class-validator';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends CreatePropertyDto {
  @IsInt({ message: 'Должно быть числом' })
  id: number;
}
