import { FinanceiroEnum, FinanceiroTipoEnum } from "src/enum/financeiro.enum";
import { ReceitaParcelaResponse } from "./parcela/receita.parcela.response";

export class ReceitaResponseDto {
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
    parcelas: ReceitaParcelaResponse[];
    vencida: boolean;
    todas_parcelas_pagas: boolean;
}
