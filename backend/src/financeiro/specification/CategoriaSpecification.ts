import { SelectQueryBuilder } from 'typeorm';
import { Specification } from './Specification';
import { FinanceiroEntity } from '../financeiro.entity';
import { FinanceiroCategoriaEnum } from 'src/enum/financeiro.enum';

export class CategoriaSpecification implements Specification<FinanceiroEntity> {
  constructor(private categoria: FinanceiroCategoriaEnum) {}

  apply(
    query: SelectQueryBuilder<FinanceiroEntity>,
  ): SelectQueryBuilder<FinanceiroEntity> {
    return query.andWhere('financeiro.categoria = :categoria', {
      categoria: this.categoria,
    });
  }
}
