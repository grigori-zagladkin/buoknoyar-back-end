import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { ExistException } from 'src/exceptions/exist.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const candidate = await this.prisma.category.findFirst({
      where: {
        title: dto.title,
      },
    });
    if (candidate) {
      throw new ExistException(dto.title);
    }
    const category = await this.prisma.category.create({
      data: { ...dto },
    });
    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category | null> {
    return await this.prisma.category.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  async update(dto: UpdateCategoryDto): Promise<Category | null> {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: {
        id: dto.id,
      },
    });
    await this.prisma.category.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
      },
    });
    return category;
  }

  async remove(id: number): Promise<boolean | null> {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    await this.prisma.categoryAttributes.deleteMany({
      where: {
        categoryId: category.id,
      },
    });
    await this.prisma.category.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
