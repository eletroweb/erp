import { FinanceiroEnum } from "src/enum/financeiro.enum";

export interface DespesaParcelaSituacaoRequest {
    despesa_uuid: string;
    parcela: number;
    situacao: FinanceiroEnum;
}  