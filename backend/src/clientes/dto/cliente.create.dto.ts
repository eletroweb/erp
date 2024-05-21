import { IsEmail, Validate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { ClienteDocumentoValidation } from "../validator/cliente.documento.validator";
import { ClienteEmailValidation } from "../validator/cliente.email.validator";

export class ClienteCreateDto {
    nome: string;

    @ApiProperty()
    @IsEmail()
    @Validate(ClienteEmailValidation)
    email: string;
    telefone: string;

    @Validate(ClienteDocumentoValidation)
    documento: string;
    
    estado?: string;
    cidade?: string;
    endereco?: string;
    complemento?: string;
    situacao?: boolean;
    setor?: string;
  }