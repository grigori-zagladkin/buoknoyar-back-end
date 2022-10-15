import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends CreateServiceDto {
  @IsInt({ message: 'Должно быть целым числом' })
  @ApiProperty({ example: 1, description: 'id услуги' })
  readonly id: number;
}
