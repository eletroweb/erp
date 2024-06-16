import { FinanceiroEnum } from 'src/enum/financeiro.enum';

export interface FinanceiroParcelaSituacaoRequest {
  financeiro_uuid: string;
  parcela: number;
  data_pagamento: string;
  situacao: FinanceiroEnum;
  observacao: string;
}
