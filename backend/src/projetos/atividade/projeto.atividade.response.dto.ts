import { SetorResponseDto } from "src/setores/setor.response.dto";
import { ProjetoResponseDto } from "../projeto.response.dto";

export class ProjetoAtividadeResponseDto {
    uuid: string;
    descricao: string;
    observacao: string;
    projeto: string;
    setor: SetorResponseDto;
    situacao: boolean;
    data_inicio: Date;
    data_cadastro: Date;
    data_fim: Date;
    data_atualizacao: Date;
  }