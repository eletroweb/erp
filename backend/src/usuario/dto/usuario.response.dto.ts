import { SituacaoEnum } from 'src/enum/situacao.enum';

export class UsuarioLogado {
  readonly sub: string;
  readonly uuid: string;
  readonly nome: string;
  readonly email: string;
  readonly username: string;
  readonly situacao: SituacaoEnum;
  readonly roles: string[];
}
