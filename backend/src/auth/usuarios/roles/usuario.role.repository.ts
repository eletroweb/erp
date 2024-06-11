// usuario.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { UsuarioRoleEntity } from './usuario.roles.entity';

@EntityRepository(UsuarioRoleEntity)
export class UsuarioRoleRepository extends Repository<UsuarioRoleEntity> {
}
