export class ProjetoRequestDto {
  cliente: string;
  setor: string;
  responsavel: string;
  situacao?: number;
  orcamento?: number;
  data_inicio?: Date;
  data_fim?: Date;
  observacao?: string;
}