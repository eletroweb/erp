import { SelectQueryBuilder } from 'typeorm';
import { FinanceiroEntity } from '../financeiro.entity';
import { Specification } from './Specification';

export class ParceladaSpecification implements Specification<FinanceiroEntity> {
  constructor(private parcelada: boolean) {}

  apply(
    query: SelectQueryBuilder<FinanceiroEntity>,
  ): SelectQueryBuilder<FinanceiroEntity> {
    return query.andWhere('financeiro.parcelada = :parcelada', {
      parcelada: this.parcelada,
    });
  }
}
