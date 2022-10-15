import { HttpException, HttpStatus } from '@nestjs/common';

export class FileDeleteException extends HttpException {
  constructor() {
    super('Ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
