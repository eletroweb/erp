import { SelectQueryBuilder } from 'typeorm';
import { FinanceiroEntity } from '../financeiro.entity';
import { Specification } from './Specification';

export class DescricaoSpecification implements Specification<FinanceiroEntity> {
  constructor(private descricao: string) {}

  apply(
    query: SelectQueryBuilder<FinanceiroEntity>,
  ): SelectQueryBuilder<FinanceiroEntity> {
    return query.andWhere('financeiro.descricao LIKE :descricao', {
      descricao: `%${this.descricao}%`,
    });
  }
}
