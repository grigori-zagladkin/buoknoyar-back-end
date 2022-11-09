import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { ExistException } from 'src/exceptions/exist.exception';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    private readonly file: FilesService,
    private readonly prisma: PrismaService,
  ) {}
  async create(dto: CreateServiceDto): Promise<Service | null> {
    const candidate = await this.prisma.service.findFirst({
      where: {
        title: dto.title,
      },
    });
    if (candidate) {
      throw new ExistException(dto.title);
    }
    const createdService = await this.prisma.service.create({
      data: {
        ...dto,
      },
    });
    return createdService;
  }

  async findAll(): Promise<Service[] | null> {
    return await this.prisma.service.findMany();
  }

  async findOne(id: number): Promise<Service | null> {
    return await this.prisma.service.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  async update(dto: UpdateServiceDto): Promise<Service | null> {
    return await this.prisma.service.update({
      where: {
        id: +dto.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number): Promise<number | null> {
    await this.prisma.service.delete({
      where: {
        id: id,
      },
    });
    return id;
  }
}
