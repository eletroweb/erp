import { SelectQueryBuilder } from 'typeorm';
import { FinanceiroEntity } from '../financeiro.entity';
import { Specification } from './Specification';

export class SituacaoSpecification implements Specification<FinanceiroEntity> {
  constructor(private situacao: string) {}

  apply(
    query: SelectQueryBuilder<FinanceiroEntity>,
  ): SelectQueryBuilder<FinanceiroEntity> {
    return query.andWhere('financeiro.situacao = :situacao', {
      situacao: this.situacao,
    });
  }
}
