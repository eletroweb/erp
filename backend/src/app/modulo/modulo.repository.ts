import { EntityRepository, Repository } from 'typeorm';
import { ModuloEntity } from './module.entity';

@EntityRepository(ModuloEntity)
export class ModuloRepository extends Repository<ModuloEntity> {
}
