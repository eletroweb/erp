// projeto.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { ProjetoAtividadeEntity } from './projeto.atividade.entity';

@EntityRepository(ProjetoAtividadeEntity)
export class ProjetoAtividadeRepository extends Repository<ProjetoAtividadeEntity> {
}
