import { IsArray, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString({ message: 'Должно быть строкой' })
  name: string;
  @IsArray({ message: 'Должно быть массивом' })
  categories: number[];
}
