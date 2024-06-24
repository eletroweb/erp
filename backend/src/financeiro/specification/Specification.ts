import { SelectQueryBuilder } from 'typeorm';

export interface Specification<T> {
  apply(query: SelectQueryBuilder<T>): SelectQueryBuilder<T>;
}
