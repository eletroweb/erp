// setor.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { SetorEntity } from './setor.entity';

@EntityRepository(SetorEntity)
export class SetorRepository extends Repository<SetorEntity> {
}
