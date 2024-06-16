import { SituacaoEnum } from 'src/enum/situacao.enum';
export interface ModuloRequest {
  nome: string;
  situacao: SituacaoEnum;
}
