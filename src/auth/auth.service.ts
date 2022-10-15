import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Role, User } from '@prisma/client';
import { ExistException } from 'src/exceptions/exist.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private async validateUser(dto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Пользователь не зарегистрирован',
    });
  }

  private async generateToken(user: User) {
    const roles = await this.prisma.userRoles.findMany({
      where: {
        userId: user.id,
      },
    });
    const _roles: Role[] = [];
    for (const elem of roles) {
      _roles.push(
        await this.prisma.role.findFirst({
          where: {
            id: elem.roleId,
          },
        }),
      );
    }
    const payload = {
      login: user.login,
      id: user.id,
      roles: _roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }
  async registration(dto: CreateUserDto) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });
    if (candidate) {
      throw new ExistException(dto.login);
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    if (user) {
      return this.generateToken(user);
    }
  }
  async me(token: string) {
    const isVerifyToken = await this.jwtService.verify(token);
    if (!isVerifyToken) {
      throw new UnauthorizedException({ message: 'Токен не верифицирован' });
    }
    const decoded = this.jwtService.decode(token);
    return {
      token,
    };
  }
}
