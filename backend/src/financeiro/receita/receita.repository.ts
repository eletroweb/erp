// cliente.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { ReceitaEntity } from './receita.entity';

@EntityRepository(ReceitaEntity)
export class ReceitaRepository extends Repository<ReceitaEntity> {
}
