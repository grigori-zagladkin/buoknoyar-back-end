import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [AuthModule],
})
export class FilesModule {}
