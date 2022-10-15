import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200 })
  @Post('/login')
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200 })
  @Post('/registration')
  async registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'Получение данных о пользователе' })
  @ApiResponse({ status: 200 })
  @Get('/me')
  async me(@Headers('authorization') authorization: string) {
    return this.authService.me(authorization.split(' ')[1]);
  }
}
