import { Injectable, NotFoundException } from '@nestjs/common';
import { Attribute } from '@prisma/client';
import { CategoriesService } from 'src/categories/categories.service';
import { ExistException } from 'src/exceptions/exist.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly category: CategoriesService,
  ) {}

  async create(dto: CreatePropertyDto): Promise<Attribute | null> {
    const candidate = await this.prisma.attribute.findFirst({
      where: { name: dto.name },
    });
    if (candidate) {
      throw new ExistException(dto.name);
    }
    const property = await this.prisma.attribute.create({
      data: {
        name: dto.name,
      },
    });
    for (const elem of dto.categories) {
      await this.prisma.categoryAttributes.create({
        data: {
          categoryId: elem,
          attributeId: property.id,
        },
      });
    }
    return property;
  }

  async findAll(): Promise<Attribute[] | null> {
    return this.prisma.attribute.findMany();
  }

  async findOne(id: number): Promise<Attribute | null> {
    const attribute = this.prisma.attribute.findUnique({ where: { id: id } });
    if (!attribute) {
      throw new NotFoundException(`Атрибута с таким ${id} не было найдено`);
    }
    return attribute;
  }

  async update(dto: UpdatePropertyDto): Promise<Attribute | null> {
    const property = await this.prisma.attribute.findUniqueOrThrow({
      where: { id: dto.id },
    });
    return await this.prisma.attribute.update({
      where: { id: dto.id },
      data: { ...dto },
    });
  }

  async remove(id: number) {
    const property = await this.prisma.attribute.findUniqueOrThrow({
      where: { id: id },
    });
    return await this.prisma.attribute.delete({
      where: {
        id: id,
      },
    });
  }
}
