import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService],
  imports: [AuthModule, FilesModule],
})
export class ItemsModule {}
