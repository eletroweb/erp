import { FinanceiroSituacaoEnum } from "@/enum/financeiro.enum";

export interface FinanceiroParcelaSituacaoRequest {
    financeiro_uuid: string;
    parcela: number;
    situacao: FinanceiroSituacaoEnum;
}  