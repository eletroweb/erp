import { FinanceiroEnum } from "src/enum/financeiro.enum";

export class ReceitaParcelaRequest {
    parcela: number;
    valor: number;
    data_vencimento: string;
    situacao: FinanceiroEnum;
}  