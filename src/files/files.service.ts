import { Injectable } from '@nestjs/common';
import { FileWriteException } from 'src/exceptions/file-write.exception';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { FileDeleteException } from 'src/exceptions/file-remove.exception';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string | null> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new FileWriteException();
    }
  }
  async deleteFile(fileName: string): Promise<boolean | null> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      fs.rmSync(path.join(filePath, fileName));
      return true;
    } catch (err) {
      throw new FileDeleteException();
    }
  }
}
