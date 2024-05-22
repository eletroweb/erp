import { FinanceiroEnum, FinanceiroTipoEnum } from "src/enum/financeiro.enum";
import { ReceitaParcelaRequest } from "./parcela/receita.parcela.request";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ReceitaRequestDto {
    id?: number;
    descricao: string;
    tipo: FinanceiroTipoEnum;
    observacao?: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_cobranca: number;
    parcelada: boolean;
    numero_parcelas: number;
    situacao: FinanceiroEnum;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReceitaParcelaRequest)
    parcelas: ReceitaParcelaRequest[];
}
