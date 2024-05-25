import { FinanceiroCategoriaEnum, FinanceiroEnum, FinanceiroTipoEnum } from "src/enum/financeiro.enum";
import { FinanceiroParcelaResponse } from "./parcela/financeiro.parcela.response";

export class FinanceiroResponseDto {
    uuid?: string;
    categoria: FinanceiroCategoriaEnum;
    tipo: FinanceiroTipoEnum;
    descricao: string;
    fornecedor: string;
    observacao?: string;
    data_vencimento: Date;
    data_pagamento: Date;
    valor_cobranca: string;
    valor_pago: number;
    parcelada: boolean;
    numero_parcelas: number;
    situacao: FinanceiroEnum;
    parcelas: FinanceiroParcelaResponse[];
    vencida: boolean;
    todas_parcelas_pagas: boolean;
}
