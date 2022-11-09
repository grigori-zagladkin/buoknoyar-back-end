import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends CreateServiceDto {
  @ApiProperty({ example: 1, description: 'id услуги' })
  @IsInt({ message: 'Должно быть числом' })
  readonly id: number;
}
