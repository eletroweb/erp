import { SetorResponseDto } from "src/setores/setor.response.dto";
import { ProjetoResponseDto } from "../projeto.response.dto";

export class ProjetoAtividadesResponseDto {
    uuid: string;
    descricao: string;
    projeto: ProjetoResponseDto;
    setor: SetorResponseDto;
    situacao: boolean;
    orcamento: number;
    data_inicio: Date;
    data_fim: Date;
    observacao: string;
    data_cadastro: Date;
    data_atualizacao: Date;
  }
  