import { FinanceiroCategoriaEnum, FinanceiroEnum, FinanceiroTipoEnum } from "src/enum/financeiro.enum";
import { FinanceiroParcelaRequest } from "./parcela/financeiro.parcela.request";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class FinanceiroRequestDto {
    id?: number;
    descricao: string;
    fornecedor: string;
    tipo: FinanceiroTipoEnum;
    observacao?: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_cobranca: string;
    parcelada: boolean;
    numero_parcelas: number;
    situacao: FinanceiroEnum;
    categoria: FinanceiroCategoriaEnum;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FinanceiroParcelaRequest)
    parcelas: FinanceiroParcelaRequest[];
}
