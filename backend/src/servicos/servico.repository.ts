// cliente.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { ServicoEntity } from './servico.entity';

@EntityRepository(ServicoEntity)
export class ServicoRepository extends Repository<ServicoEntity> {}
