import { ProjetoAtividadeSituacao } from "src/enum/projeto.atividade.situacao.enum";

export class ProjetoAtividadeRequestDto {
  projeto: string;
  prioridade: number
  setor: string;
  situacao: ProjetoAtividadeSituacao;
  data_inicio: Date;
  data_fim: Date;
  descricao: string;
  observacao?: string;
}

