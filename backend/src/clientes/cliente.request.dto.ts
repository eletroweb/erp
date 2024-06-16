import { IsEmail, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClienteDocumentoValidation } from './validator/cliente.documento.validator';
import { ClienteEmailValidation } from './validator/cliente.email.validator';
import { EnderecoResponse } from 'src/app/endereco.response';

export class ClienteRequestDto {
  nome: string;

  @ApiProperty()
  @IsEmail()
  @Validate(ClienteEmailValidation)
  email: string;

  telefone: string;

  @Validate(ClienteDocumentoValidation)
  documento: string;

  situacao?: boolean;
  setor?: string;

  endereco?: EnderecoResponse;
}
