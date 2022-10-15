import { HttpException } from '@nestjs/common';

export const HTTP_EXIST_ERROR = 409;

export class ExistException extends HttpException {
  constructor(value: string | number) {
    super(
      `Сущность с таким значением уже существует. Значение сущности: ${value}`,
      HTTP_EXIST_ERROR,
    );
  }
}
