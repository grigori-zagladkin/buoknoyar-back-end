import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ExistException } from 'src/exceptions/exist.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(dto: CreateRoleDto): Promise<Role | null> {
    const candidate = await this.prisma.role.findFirst({
      where: { value: dto.value },
    });
    if (candidate) {
      throw new ExistException(dto.value);
    }
    const role = await this.prisma.role.create({
      data: { ...dto },
    });
    return role;
  }

  async getRoleByValue(value: string): Promise<Role | null> {
    return await this.prisma.role.findFirstOrThrow({
      where: { value },
    });
  }
}
