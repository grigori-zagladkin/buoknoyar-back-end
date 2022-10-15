import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuards } from 'src/auth/roles.guards';
import { RoleModel } from './entities/role.entity';
import { Role } from '@prisma/client';

@ApiTags('Роли пользователя')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: RoleModel })
  create(@Body() dto: CreateRoleDto): Promise<Role | null> {
    return this.rolesService.createRole(dto);
  }

  @Get('/:value')
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Получение роли' })
  @ApiResponse({ status: 200, type: RoleModel })
  findByValue(@Param('value') value: string): Promise<Role | null> {
    return this.rolesService.getRoleByValue(value);
  }
}
