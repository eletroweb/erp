import { FinanceiroCategoriaEnum, FinanceiroEnum, FinanceiroTipoEnum } from "src/enum/financeiro.enum";
import { FinanceiroParcelaResponse } from "./parcela/financeiro.parcela.response";
import { SetorResponseDto } from "src/setores/setor.response.dto";
import { ContratoResponseDto } from "src/contratos/contrato.response.dto";

export class FinanceiroResponseDto {
    uuid?: string;
    categoria: FinanceiroCategoriaEnum;
    tipo: FinanceiroTipoEnum;
    setor: SetorResponseDto;
    contrato: ContratoResponseDto;
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
