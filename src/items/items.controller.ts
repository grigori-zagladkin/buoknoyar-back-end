import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuards } from 'src/auth/roles.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { Item } from '@prisma/client';

@ApiTags('Товары')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 200 })
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createItemDto: CreateItemDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Item | null> {
    return this.itemsService.create(createItemDto, image);
  }

  @Get()
  index(
    @Query('orderBy') orderBy: string = 'asc',
    @Query('limit') limit: number = 40,
    @Query('categoryId') categoryId: number = 1,
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
  ) {
    return this.itemsService.findAll();
    // limit = limit > 40 ? 40 : limit;
    // let offset = limit * page - limit;
    // if (categoryId == 1 && search == '') {
    //   return this.itemsService.findAll(limit, offset);
    // } else if (search == '' && categoryId > 1) {
    //   return this.itemsService.findByCategories(categoryId, limit, offset);
    // } else if (search && categoryId == 1) {
    //   return this.itemsService.findByTitle(search, limit, offset);
    // } else if (search && categoryId > 1) {
    //   return this.itemsService.findByTitleAndCategories(
    //     search,
    //     categoryId,
    //     limit,
    //     offset,
    //   );
    // }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('image'))
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Обновление товара' })
  @ApiResponse({ status: 200 })
  update(
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.itemsService.update(updateItemDto, image);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
