import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleModel implements Role {
  @ApiProperty({ example: 1, description: 'id роли' })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  value: string;
}
