import { FinanceiroEnum } from "src/enum/financeiro.enum";

export interface ReceitaParcelaSituacaoRequest {
    receita_uuid: string;
    parcela: number;
    situacao: FinanceiroEnum;
}  