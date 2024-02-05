export class ClienteRequestDto {
    nome: string;
    email: string;
    documento: string;
    estado?: string;
    cidade?: string;
    endereco?: string;
    complemento?: string;
    situacao?: number;
    setor?: string;
  }