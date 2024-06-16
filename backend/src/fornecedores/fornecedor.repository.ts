import { EntityRepository, Repository } from 'typeorm';
import { FornecedorEntity } from './fornecedor.entity';

@EntityRepository(FornecedorEntity)
export class FornecedorRepository extends Repository<FornecedorEntity> {}
