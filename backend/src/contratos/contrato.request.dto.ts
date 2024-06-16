export class ContratoRequestDto {
  uuid: string;
  descricao: string;
  situacao?: number;
  orcamento?: number;
  data_inicio?: Date;
  data_fim?: Date;
}
