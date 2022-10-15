import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService],
  imports: [FilesModule, AuthModule],
})
export class ItemsModule {}
