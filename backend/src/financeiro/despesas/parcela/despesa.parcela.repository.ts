import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DespesaParcelaRepository)
export class DespesaParcelaRepository extends Repository<DespesaParcelaRepository> {
}
