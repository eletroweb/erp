import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';

export class UsuarioCreateRequestDto {
  @IsNotEmpty({ message: 'O UUID é obrigatório.' })
  readonly uuid: string;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  readonly nome: string;

  @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
  readonly username: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(3, { message: 'A senha deve ter pelo menos 3 caracteres.' })
  readonly password: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  readonly email: string;

  @IsNotEmpty({ message: 'A situação é obrigatória.' })
  readonly situacao: number;

  @IsNotEmpty({ message: 'Os roles são obrigatórios.' })
  readonly roles: string[];
}

