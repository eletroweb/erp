export class AtividadeDto {
  projeto: string;
  setor: string;
  situacao: boolean;
  data_inicio: string;
  data_fim: string;
  descricao: string;
  observacao: string;

  constructor(
    projeto: string,
    setor: string,
    situacao: boolean,
    data_inicio: string,
    data_fim: string,
    descricao: string,
    observacao: string,
  ) {
    this.projeto = projeto;
    this.setor = setor;
    this.situacao = situacao;
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
    this.descricao = descricao;
    this.observacao = observacao;
  }
}
