export class UsuarioRequestDto {
  readonly uuid: string;
  readonly nome: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly situacao: number;
  readonly roles: string[]
}