// cliente.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { ContratoEntity } from './contrato.entity';

@EntityRepository(ContratoEntity)
export class ContratoRepository extends Repository<ContratoEntity> {
}