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
  async create(
    dto: CreateServiceDto,
    image: Express.Multer.File,
  ): Promise<Service | null> {
    const candidate = await this.prisma.service.findFirst({
      where: {
        title: dto.title,
      },
    });
    if (candidate) {
      throw new ExistException(dto.title);
    }
    const fileName = await this.file.createFile(image);
    const createdService = await this.prisma.service.create({
      data: {
        ...dto,
        image: fileName,
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

  async update(
    dto: UpdateServiceDto,
    image: Express.Multer.File,
  ): Promise<Service | null> {
    const service = await this.prisma.service.findFirstOrThrow({
      where: {
        id: +dto.id,
      },
    });
    await this.file.deleteFile(service.image);
    const fileName = await this.file.createFile(image);
    return await this.prisma.service.update({
      where: {
        id: +dto.id,
      },
      data: {
        ...dto,
        id: +dto.id,
        image: fileName,
      },
    });
  }

  async remove(id: number): Promise<boolean | null> {
    const service = await this.prisma.service.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    await this.file.deleteFile(service.image);
    await this.prisma.service.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
