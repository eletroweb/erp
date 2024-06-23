export class EmpresaRequestDto {
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
}