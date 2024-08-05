/* eslint-disable prettier/prettier */
import {
  FinanceiroCategoriaEnum,
  FinanceiroCentroDeCustoEnum,
  FinanceiroEnum,
  FinanceiroTipoEnum,
} from 'src/enum/financeiro.enum';
import { FinanceiroParcelaRequest } from './parcela/financeiro.parcela.request';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ContratoRequestDto } from 'src/contratos/contrato.request.dto';
import { SetorRequest } from 'src/setores/setor.request';

export class FinanceiroRequestDto {
  id?: number;
  descricao: string;
  fornecedor: string;
  centro_custo: FinanceiroCentroDeCustoEnum;
  tipo: FinanceiroTipoEnum;
  setor: SetorRequest;
  contrato: ContratoRequestDto;
  observacao?: string;
  data_vencimento: string;
  data_pagamento: string;
  valor_cobranca: string;
  parcelada: boolean;
  numero_parcelas: number;
  situacao: FinanceiroEnum;
  categoria: FinanceiroCategoriaEnum;
  juros: number;
  valor_total: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FinanceiroParcelaRequest)
  parcelas: FinanceiroParcelaRequest[];
}
