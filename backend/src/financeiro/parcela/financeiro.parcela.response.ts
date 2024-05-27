import { FinanceiroEnum } from "src/enum/financeiro.enum";

export class FinanceiroParcelaResponse {
    uuid: string;
    parcela: number;
    valor: number;
    data_vencimento: Date;
    data_pagamento: Date;
    comprovante: string;
    observacao: string;
    situacao: FinanceiroEnum;
}  