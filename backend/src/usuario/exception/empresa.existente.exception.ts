import { HttpException, HttpStatus } from '@nestjs/common';

export class EmpresaExistenteException extends HttpException {
    constructor(mensage?: string, status?: HttpStatus) {
        super(mensage || "Já existe uma empresa cadastrada com este CNPJ", status || HttpStatus.BAD_REQUEST);
    }
}
