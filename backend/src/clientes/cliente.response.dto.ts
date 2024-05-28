import { EnderecoResponse } from 'src/app/endereco.response';
import { SetorResponseDto } from '../setores/setor.response.dto';

export class ClienteResponseDto {
  uuid: string;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  situacao: boolean;
  data_cadastro?: Date;
  data_atualizacao?: Date;
  setor?: SetorResponseDto;
  endereco?: EnderecoResponse;
}