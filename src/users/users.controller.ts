import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { UserModel } from './entities/user.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuards } from 'src/auth/roles.guards';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserModel })
  create(@Body() dto: CreateUserDto): Promise<User | null> {
    return this.usersService.createUser(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: UserModel })
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiOkResponse({ status: 200 })
  @ApiResponseProperty({ example: true })
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  delete(@Param('id') id: string): Promise<boolean | null> {
    return this.usersService.delete(+id);
  }
}
