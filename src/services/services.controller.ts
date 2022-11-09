import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuards } from 'src/auth/roles.guards';
import { Service } from '@prisma/client';
import { ServiceModel } from './entities/service.entity';

@ApiTags('Услуги')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание услуги' })
  @ApiResponse({ status: 200, type: ServiceModel })
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  create(@Body() dto: CreateServiceDto): Promise<Service | null> {
    return this.servicesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех услуг' })
  @ApiResponse({ status: 200, type: [ServiceModel] })
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение услуги по id' })
  @ApiResponse({ status: 200, type: ServiceModel })
  findOne(@Param('id') id: string): Promise<Service | null> {
    return this.servicesService.findOne(+id);
  }

  @Patch()
  @ApiOperation({ summary: 'Обновление услуги' })
  @ApiResponse({ status: 200, type: ServiceModel })
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  update(@Body() updateServiceDto: UpdateServiceDto): Promise<Service | null> {
    return this.servicesService.update(updateServiceDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Удаление услуги' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  remove(@Param('id') id: string): Promise<number | null> {
    return this.servicesService.remove(+id);
  }
}
