import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
  imports: [AuthModule, FilesModule],
})
export class ServicesModule {}
