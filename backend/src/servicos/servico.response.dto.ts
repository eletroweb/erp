import { SetorResponseDto } from '../setores/setor.response.dto';

export class ServicoResponseDto {
  uuid: string;
  descricao: string;
  situacao: number;
  valor: number;
  contrato_id: number;
  data_cadastro?: Date;
  data_atualizacao?: Date;
  setor?: SetorResponseDto;
}