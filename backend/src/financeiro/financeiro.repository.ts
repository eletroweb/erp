import { EntityRepository, Repository } from 'typeorm';
import { FinanceiroEntity } from './financeiro.entity';

@EntityRepository(FinanceiroEntity)
export class FinanceiroRepository extends Repository<FinanceiroEntity> {}
