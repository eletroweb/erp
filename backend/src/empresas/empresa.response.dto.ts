export class EmpresaResponseDto {
  id: number;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  email: string;
  cep: string;
  estado: string;
  cidade: string;
  endereco: string;
  numero: string;
  complemento?: string;
  data_cadastro: Date;
  data_atualizacao: Date;
}
