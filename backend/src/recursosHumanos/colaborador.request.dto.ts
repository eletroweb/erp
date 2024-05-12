export class ColaboradorRequestDto {
    nome: string;
    email: string;
    telefone: string;
    documento: string;
    cargo?: string;
    salario?: string;
    valor_hora?: string;
    observacao?: string;
    situacao?: boolean;
  }