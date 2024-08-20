import { HttpException, HttpStatus } from '@nestjs/common';

export class UsuarioExistenteException extends HttpException {
  constructor(mensage?: string, status?: HttpStatus) {
    super(
      mensage || 'Este email já está em uso. Por favor, use outro email',
      status || HttpStatus.BAD_REQUEST,
    );
  }
}
