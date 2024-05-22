import { FinanceiroEnum, FinanceiroTipoEnum } from "src/enum/financeiro.enum";
import { DespesaParcelaRequest } from "./parcela/despesa.parcela.request";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class DespesaRequestDto {
    id?: number;
    descricao: string;
    tipo: FinanceiroTipoEnum;
    observacao?: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_cobranca: string;
    parcelada: boolean;
    numero_parcelas: number;
    situacao: FinanceiroEnum;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DespesaParcelaRequest)
    parcelas: DespesaParcelaRequest[];
}
