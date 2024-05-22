import { FinanceiroSituacaoEnum } from "@/enum/financeiro.enum";

export interface DespesaParcelaSituacaoRequest {
    despesa_uuid: string;
    parcela: number;
    situacao: FinanceiroSituacaoEnum;
}  