import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  // @Get('/:id')
  // findOne(@Param('id') id: string) {}

  // @Patch()
  // update(@Body() dto: UpdateUserDto) {
  //   // return this.usersService.
  // }
}
