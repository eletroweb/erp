import { FinanceiroEnum, FinanceiroTipoEnum } from "src/enum/financeiro.enum";
import { DespesaParcelaResponse } from "./parcela/despesa.parcela.response";

export class DespesaResponseDto {
    uuid?: string;
    descricao: string;
    tipo: FinanceiroTipoEnum;
    observacao?: string;
    data_vencimento: Date;
    data_pagamento: Date;
    valor_cobranca: number;
    valor_pago: number;
    parcelada: boolean;
    numero_parcelas: number;
    situacao: FinanceiroEnum;
    parcelas: DespesaParcelaResponse[];
    vencida: boolean;
    todas_parcelas_pagas: boolean;
}
