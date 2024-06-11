import { SituacaoEnum } from 'src/enum/situacao.enum';
export interface RoleRequest {
    nome: string;
    descricao: string;
    modulo: string;
    situacao: SituacaoEnum;
}