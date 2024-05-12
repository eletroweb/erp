export class ColaboradorResponseDto {
    uuid: string;
    nome: string;
    email: string;
    telefone: string;
    documento: string;
    cargo?: string;
    salario?: string;
    valor_hora?: string;
    observacao?: string;
    situacao: boolean;
    data_cadastro?: Date;
    data_atualizacao?: Date;
  }