import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ExistException } from 'src/exceptions/exist.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleService: RoleService,
  ) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    const candidate = await this.prisma.user.findFirst({
      where: { login: dto.login },
    });
    if (candidate) {
      throw new ExistException(dto.login);
    }
    const role = await this.roleService.getRoleByValue('ADMIN');
    const user = await this.prisma.user.create({
      data: { ...dto },
    });
    await this.prisma.userRoles.create({
      data: {
        userId: user.id,
        roleId: role.id,
      },
    });
    return user;
  }
  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}
