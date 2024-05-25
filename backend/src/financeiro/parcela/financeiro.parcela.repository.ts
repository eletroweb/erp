import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(FinanceiroParcelaRepository)
export class FinanceiroParcelaRepository extends Repository<FinanceiroParcelaRepository> {
}
