import { HttpException, HttpStatus } from '@nestjs/common';

export class FileWriteException extends HttpException {
  constructor() {
    super('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
