import { forwardRef, Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, PrismaService],
  imports: [forwardRef(() => CategoriesModule), AuthModule],
})
export class PropertiesModule {}
