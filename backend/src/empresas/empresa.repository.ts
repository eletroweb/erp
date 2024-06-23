import { EntityRepository, Repository } from 'typeorm';
import { EmpresaEntity } from './empresa.entity';

@EntityRepository(EmpresaEntity)
export class EmpresaRepository extends Repository<EmpresaEntity> {}