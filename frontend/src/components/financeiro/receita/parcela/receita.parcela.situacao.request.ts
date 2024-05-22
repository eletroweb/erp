import { FinanceiroSituacaoEnum } from "@/enum/financeiro.enum";

export interface ReceitaParcelaSituacaoRequest {
    receita_uuid: string;
    parcela: number;
    situacao: FinanceiroSituacaoEnum;
}  