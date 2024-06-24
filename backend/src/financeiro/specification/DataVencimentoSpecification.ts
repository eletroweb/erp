import { SelectQueryBuilder } from 'typeorm';
import { FinanceiroEntity } from '../financeiro.entity';
import { Specification } from './Specification';

export class DataVencimentoSpecification
  implements Specification<FinanceiroEntity>
{
  constructor(
    private dataInicio: string,
    private dataFim: string,
  ) {}

  apply(
    query: SelectQueryBuilder<FinanceiroEntity>,
  ): SelectQueryBuilder<FinanceiroEntity> {
    if (this.dataInicio && this.dataFim) {
      return query.andWhere(
        'financeiro.data_vencimento BETWEEN :dataInicio AND :dataFim',
        {
          dataInicio: this.dataInicio,
          dataFim: this.dataFim,
        },
      );
    } else if (this.dataInicio) {
      return query.andWhere('financeiro.data_vencimento >= :dataInicio', {
        dataInicio: this.dataInicio,
      });
    } else if (this.dataFim) {
      return query.andWhere('financeiro.data_vencimento <= :dataFim', {
        dataFim: this.dataFim,
      });
    }
    return query;
  }
}
