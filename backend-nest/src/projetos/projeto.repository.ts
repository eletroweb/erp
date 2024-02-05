// projeto.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { ProjetoEntity } from './projeto.entity';

@EntityRepository(ProjetoEntity)
export class ProjetoRepository extends Repository<ProjetoEntity> {
}
