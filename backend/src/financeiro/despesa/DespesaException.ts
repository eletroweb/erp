import { HttpException, HttpStatus } from '@nestjs/common';

export class DespesaException extends HttpException {
    constructor(errors: string) {
        super(errors, HttpStatus.BAD_REQUEST);
    }
}