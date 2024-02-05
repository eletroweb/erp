import { SetorResponseDto } from '../setores/setor.response.dto';

export class ClienteResponseDto {
  uuid: string;
  nome: string;
  email: string;
  documento: string;
  estado?: string;
  cidade?: string;
  endereco?: string;
  complemento?: string;
  situacao: number;
  data_cadastro?: Date;
  data_atualizacao?: Date;
  setor?: SetorResponseDto;
}