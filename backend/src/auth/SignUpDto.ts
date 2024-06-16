/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ description: 'Nome de usuário' })
  username: string;

  @ApiProperty({ description: 'Endereço de e-mail' })
  email: string;

  @ApiProperty({ description: 'Senha' })
  password: string;
}
