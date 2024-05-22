import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ReceitaParcelaRepository)
export class ReceitaParcelaRepository extends Repository<ReceitaParcelaRepository> {
}
