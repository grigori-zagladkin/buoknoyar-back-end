import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuards } from 'src/auth/roles.guards';
import { Item } from '@prisma/client';
import { ItemModel } from './entities/item.entity';

@ApiTags('Товары')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 200 })
  create(@Body() createItemDto: CreateItemDto): Promise<Item | null> {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение товаров' })
  @ApiResponse({ type: [ItemModel], status: 200 })
  index(
    @Query('orderBy') orderBy: string = 'asc',
    @Query('limit') limit: number = 40,
    @Query('categoryId') categoryId: number = 1,
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
  ) {
    return this.itemsService.findAll(orderBy, limit, categoryId, search, page);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение товара по id' })
  @ApiResponse({ type: ItemModel, status: 200 })
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch()
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Обновление товара' })
  @ApiResponse({ status: 200 })
  update(@Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(updateItemDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string): Promise<number> {
    return this.itemsService.remove(+id);
  }
}
