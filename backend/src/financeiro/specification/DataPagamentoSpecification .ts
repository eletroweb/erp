import { SelectQueryBuilder } from 'typeorm';
import { FinanceiroEntity } from '../financeiro.entity';
import { Specification } from './Specification';

export class DataPagamentoSpecification
  implements Specification<FinanceiroEntity>
{
  constructor(
    private dataPagamentoInicio: string,
    private dataPagamentoFim: string,
  ) {}

  apply(
    query: SelectQueryBuilder<FinanceiroEntity>,
  ): SelectQueryBuilder<FinanceiroEntity> {
    if (this.dataPagamentoInicio && this.dataPagamentoFim) {
      return query.andWhere(
        'DATE(financeiro.data_pagamento) BETWEEN :dataPagamentoInicio AND :dataPagamentoFim',
        {
          dataPagamentoInicio: this.dataPagamentoInicio,
          dataPagamentoFim: this.dataPagamentoFim,
        },
      );
    } else if (this.dataPagamentoInicio) {
      return query.andWhere(
        'DATE(financeiro.data_pagamento) >= :dataPagamentoInicio',
        {
          dataPagamentoInicio: this.dataPagamentoInicio,
        },
      );
    } else if (this.dataPagamentoFim) {
      return query.andWhere(
        'DATE(financeiro.data_pagamento) <= :dataPagamentoFim',
        {
          dataPagamentoFim: this.dataPagamentoFim,
        },
      );
    }
    return query;
  }
}
