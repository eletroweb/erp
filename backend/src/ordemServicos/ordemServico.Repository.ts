// cliente.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { OrdemServicoEntity } from './ordemServico.entity';

@EntityRepository(OrdemServicoEntity)
export class OrdemServicoRepository extends Repository<OrdemServicoEntity> {}
