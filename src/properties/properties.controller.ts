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
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuards } from 'src/auth/roles.guards';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PropertyModel } from './entities/property.entity';
import { Attribute } from '@prisma/client';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Создание свойствa' })
  @ApiResponse({ status: 200, type: PropertyModel })
  create(@Body() dto: CreatePropertyDto): Promise<Attribute | null> {
    return this.propertiesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех свойств' })
  @ApiResponse({ status: 200, type: [PropertyModel] })
  findAll(): Promise<Attribute[]> {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение свойства по id' })
  @ApiResponse({ status: 200, type: PropertyModel })
  findOne(@Param('id') id: string): Promise<Attribute | null> {
    return this.propertiesService.findOne(+id);
  }

  @Patch()
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Обновление свойствa' })
  @ApiResponse({ status: 200, type: PropertyModel })
  update(@Body() dto: UpdatePropertyDto): Promise<Attribute | null> {
    return this.propertiesService.update(dto);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Удаление свойствa' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string): Promise<boolean | null> {
    return this.propertiesService.remove(+id);
  }
}
