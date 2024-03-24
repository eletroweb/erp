import { SetorResponseDto } from "src/setores/setor.response.dto";

export class OrdemServicoResponseDto {
    uuid: string;
    cliente: string;
    descricao: string;
    prazo: Date;
    situacao: boolean;
    data_cadastro: Date;
    data_atualizacao: Date;
    setor: SetorResponseDto
  }