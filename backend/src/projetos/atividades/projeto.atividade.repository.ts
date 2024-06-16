// projeto.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { ProjetoAtividadesEntity } from './projeto.atividade.entity';

@EntityRepository(ProjetoAtividadesEntity)
export class ProjetoAtividadeRepository extends Repository<ProjetoAtividadesEntity> {}
