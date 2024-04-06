import { SetorResponseDto } from "src/setores/setor.response.dto";
import { ProjetoResponseDto } from "../projeto.response.dto";
import { ProjetoAtividadeSituacao } from "src/enum/projeto.atividade.situacao.enum";

export class ProjetoAtividadesResponseDto {
    uuid: string;
    prioridade: number;
    descricao: string;
    projeto: ProjetoResponseDto;
    setor: SetorResponseDto;
    situacao: ProjetoAtividadeSituacao;
    orcamento: number;
    data_inicio: Date;
    data_fim: Date;
    observacao: string;
    data_cadastro: Date;
    data_atualizacao: Date;
  }
  