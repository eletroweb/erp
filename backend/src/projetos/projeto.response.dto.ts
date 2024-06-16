import { ClienteResponseDto } from 'src/clientes/cliente.response.dto';
import { SetorResponseDto } from 'src/setores/setor.response.dto';

export class ProjetoResponseDto {
  uuid: string;
  cliente: ClienteResponseDto;
  setor: SetorResponseDto;
  responsavel: string;
  situacao: boolean;
  orcamento: number;
  data_inicio: Date;
  data_fim: Date;
  observacao: string;
  data_cadastro: Date;
  data_atualizacao: Date;
}
