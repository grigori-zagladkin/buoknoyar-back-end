import { Injectable } from '@nestjs/common';
import { ExistException } from 'src/exceptions/exist.exception';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FilesService,
  ) {}
  async create(createItemDto: CreateItemDto, image: Express.Multer.File) {
    const candidate = await this.prisma.item.findFirst({
      where: {
        title: createItemDto.title,
      },
    });
    if (candidate) {
      throw new ExistException(createItemDto.title);
    }
    const fileName = await this.fileService.createFile(image);
    const createdItem = await this.prisma.item.create({
      data: {
        title: createItemDto.title,
        price: Number(createItemDto.price),
        count: Number(createItemDto.count),
        categoryId: Number(createItemDto.categoryId),
        image: fileName,
      },
    });
    for (let i = 0; i < createItemDto.properties.length; i++) {
      await this.prisma.itemAttributeValue.create({
        data: {
          itemId: createdItem.id,
          attribute: createItemDto.properties[i],
          value: createItemDto.values[i],
        },
      });
    }
    return createdItem;
  }

  async findAll() {
    return {
      items: await this.prisma.item.findMany(),
      count: await this.prisma.item.count(),
    };
  }

  async findOne(id: number) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const _properties = await this.prisma.itemAttributeValue.findMany({
      where: {
        itemId: id,
      },
    });
    const properties = _properties.map((item) => ({
      attribute: item.attribute,
      value: item.value,
    }));
    return {
      item,
      properties,
    };
  }

  async update(dto: UpdateItemDto, image: Express.Multer.File) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: {
        id: dto.id,
      },
    });
    await this.fileService.deleteFile(item.image);
    const fileName = await this.fileService.createFile(image);
    // const _properties = dto.properties.map((item, index) => ({
    //   itemId: dto.id,
    //   attribute: dto.properties[index],
    //   value: dto.values[index]
    // }));
    // const properties = await this.prisma.itemAttributeValue.createMany({
    //   data: _properties
    // })
    const updatedItem = await this.prisma.item.update({
      where: {
        id: dto.id,
      },
      data: {
        title: dto.title,
        categoryId: dto.categoryId,
        count: dto.count,
        price: dto.price,
        image: fileName,
      },
    });
    // await this.prisma.itemAttributeValue.updateMany({
    //   where: {

    //   }
    // })
    return updatedItem;
  }

  async remove(id: number) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: {
        id,
      },
    });
    await this.fileService.deleteFile(item.image);
    await this.prisma.itemAttributeValue.deleteMany({
      where: {
        itemId: id,
      },
    });
    await this.prisma.item.delete({
      where: {
        id,
      },
    });
    return true;
  }
}
