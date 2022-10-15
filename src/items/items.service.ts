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
        id: +dto.id,
      },
    });
    await this.fileService.deleteFile(item.image);
    const fileName = await this.fileService.createFile(image);
    const updatedItem = await this.prisma.item.update({
      where: {
        id: +dto.id,
      },
      data: {
        title: dto.title,
        price: Number(dto.price),
        count: Number(dto.count),
        categoryId: Number(dto.categoryId),
        image: fileName,
      },
    });
    await this.prisma.itemAttributeValue.deleteMany({
      where: {
        itemId: +dto.id,
      },
    });
    for (let i = 0; i < dto.values.length; i++) {
      await this.prisma.itemAttributeValue.create({
        data: {
          itemId: +dto.id,
          value: dto.values[i],
          attribute: dto.properties[i],
        },
      });
    }
    return {
      item: updatedItem,
      properties: [
        ...(
          await this.prisma.itemAttributeValue.findMany({
            where: { itemId: +dto.id },
          })
        ).map((item, index) => {
          return {
            attribute: item.attribute,
            value: item.value,
          };
        }),
      ],
    };
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
