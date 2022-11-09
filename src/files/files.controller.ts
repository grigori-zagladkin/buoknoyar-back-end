import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuards } from 'src/auth/roles.guards';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('/upload')
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  @UseInterceptors(FileInterceptor('image'))
  upload(@UploadedFile() image: Express.Multer.File) {
    return this.fileService.createFile(image);
  }

  @Delete('/:image')
  @Roles('ADMIN')
  @UseGuards(RolesGuards)
  delete(@Param('image') image: string) {
    return this.fileService.deleteFile(image);
  }
}
