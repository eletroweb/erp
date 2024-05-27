import { FinanceiroEnum } from "src/enum/financeiro.enum";

export class FinanceiroParcelaRequest {
    parcela: number;
    valor: number;
    data_vencimento: string;
    data_pagamento: string;
    observacao: string;
    situacao: FinanceiroEnum;
}  