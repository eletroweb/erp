import { HttpException, HttpStatus } from '@nestjs/common';

export class FinanceiroException extends HttpException {
  constructor(errors: string) {
    super(errors, HttpStatus.BAD_REQUEST);
  }
}
