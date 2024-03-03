import { ContratoResponseDto } from 'src/contratos/contrato.response.dto';
import { SetorResponseDto } from '../setores/setor.response.dto';

export class ServicoResponseDto {
  uuid: string;
  descricao: string;
  situacao: boolean;
  valor: number;
  contrato?: ContratoResponseDto;
  data_cadastro?: Date;
  data_atualizacao?: Date;
  setor?: SetorResponseDto;
}