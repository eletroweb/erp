import { FinanceiroEnum } from "src/enum/financeiro.enum";

export class DespesaParcelaRequest {
    parcela: number;
    valor: number;
    data_vencimento: string;
    situacao: FinanceiroEnum;
}  