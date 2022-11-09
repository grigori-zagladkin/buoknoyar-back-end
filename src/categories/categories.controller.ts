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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuards } from 'src/auth/roles.guards';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryModel } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200, type: CategoryModel })
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | null> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({ status: 200, type: [CategoryModel] })
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение категории' })
  @ApiResponse({ status: 200, type: CategoryModel })
  findOne(@Param('id') id: string): Promise<Category | null> {
    return this.categoriesService.findOne(+id);
  }

  @Get('/properties/:id')
  @ApiOperation({ summary: 'Получение свойст товара по id категории' })
  @ApiResponse({ status: 200 })
  getPropertiesByCategoryId(@Param('id') id: string) {
    return this.categoriesService.getPropertiesByCategoryId(+id);
  }

  @Patch()
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Обновление категории' })
  @ApiResponse({ status: 200, type: CategoryModel })
  update(@Body() dto: UpdateCategoryDto): Promise<Category | null> {
    return this.categoriesService.update(dto);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string): Promise<number | null> {
    console.log(id);
    return this.categoriesService.remove(+id);
  }
}
