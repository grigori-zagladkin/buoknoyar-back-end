import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Роли пользователя')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get('/:value')
  findByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
