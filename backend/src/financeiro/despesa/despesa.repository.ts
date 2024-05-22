// cliente.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { DespesaEntity } from './despesa.entity';

@EntityRepository(DespesaEntity)
export class DespesaRepository extends Repository<DespesaEntity> {
}
