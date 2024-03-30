export class ProjetoAtividadeRequestDto {
  projeto: string;
  prioridade: number
  setor: string;
  situacao: boolean;
  data_inicio: Date;
  data_fim: Date;
  descricao: string;
  observacao?: string;
}

