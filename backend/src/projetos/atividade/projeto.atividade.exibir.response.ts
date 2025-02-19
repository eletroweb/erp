import { ProjetoAtividadeSituacao } from 'src/enum/projeto.atividade.situacao.enum';
import { SetorResponseDto } from 'src/setores/setor.response.dto';

export class ProjetoAtividadesExibirResponseDto {
  uuid: string;
  prioridade: number;
  descricao: string;
  projeto: string;
  setor: SetorResponseDto;
  situacao: ProjetoAtividadeSituacao;
  orcamento: number;
  data_inicio: Date;
  data_fim: Date;
  observacao: string;
  data_cadastro: Date;
  data_atualizacao: Date;
}
