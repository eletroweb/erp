/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioRoleEntity } from './usuario.roles.entity';
import { RoleService } from 'src/auth/role/role.service';
import { RoleEntity } from 'src/auth/role/role.entity';

@Injectable()
export class UsuarioRoleService {
  private readonly logger = new Logger(UsuarioRoleService.name);

  constructor(
    @InjectRepository(UsuarioRoleEntity)
    private usuarioRoleRepository: Repository<UsuarioRoleEntity>,
    private readonly roleService: RoleService,
  ) {}

  async findRolesByUserId(usuario: UsuarioEntity): Promise<any> {
    const usuarioRoles = await this.usuarioRoleRepository.find({
      where: { id: usuario.id },
      relations: ['roles'],
      select: {
        roles: {
          uuid: true,
          nome: true,
        },
      },
    });
    return usuarioRoles.map((ur) => ur);
  }

  async findRolesNamesByUserId(usuario: UsuarioEntity): Promise<string[]> {
    const response = await this.findRolesByUserId(usuario);
    return response.map((role) => role.roles.nome);
  }

  async adicionarRoleAoUsuario(
    usuario: UsuarioEntity,
    requestRoles: string[],
  ): Promise<void> {
    try {
      if (requestRoles.length === 0) {
        await this.removerTodasRoles(usuario.id);
        return;
      }

      const roles = await this.roleService.mapRoles(requestRoles);
      const usuarioRoles = this.mapUsuarioRoles(usuario, roles);

      await this.usuarioRoleRepository.save(usuarioRoles);
    } catch (error) {
      this.logger.debug(
        `Erro ao tentar vincular roles ao usuário: ${error.message}`,
      );
    }
  }

  private async removerTodasRoles(usuarioId: number): Promise<void> {
    await this.usuarioRoleRepository
      .createQueryBuilder()
      .delete()
      .where('usuarioId = :usuarioId', { usuarioId })
      .execute();
  }

  private mapUsuarioRoles(
    usuario: UsuarioEntity,
    roles: RoleEntity[],
  ): UsuarioRoleEntity[] {
    if (usuario.roles) {
      this.removerRolesNaoExistentes(usuario, roles);
      return this.filtrarERemoverRolesDuplicadas(usuario, roles);
    } else {
      return this.criarUsuarioRoles(roles, usuario);
    }
  }

  private async removerRolesNaoExistentes(
    usuario: UsuarioEntity,
    roles: RoleEntity[],
  ): Promise<void> {
    const rolesToNotDelete = usuario.roles
      .filter((role) => roles.some((r) => r.nome === role.roles.nome))
      .map((role) => role.id);

    if (rolesToNotDelete.length > 0) {
      await this.usuarioRoleRepository
        .createQueryBuilder()
        .delete()
        .where('usuarioId = :usuarioId AND id NOT IN (:...rolesToNotDelete)', {
          usuarioId: usuario.id,
          rolesToNotDelete,
        })
        .execute();
    }
  }

  private filtrarERemoverRolesDuplicadas(
    usuario: UsuarioEntity,
    roles: RoleEntity[],
  ): UsuarioRoleEntity[] {
    return roles
      .filter((role) => !usuario.roles.some((ur) => ur.roles.id === role.id))
      .map((role) => this.criarUsuarioRole(role, usuario));
  }

  private criarUsuarioRoles(
    roles: RoleEntity[],
    usuario: UsuarioEntity,
  ): UsuarioRoleEntity[] {
    return roles.map((role) => this.criarUsuarioRole(role, usuario));
  }

  private criarUsuarioRole(
    role: RoleEntity,
    usuario: UsuarioEntity,
  ): UsuarioRoleEntity {
    const usuarioRole = new UsuarioRoleEntity();
    usuarioRole.role_id = role.id;
    usuarioRole.usuario = usuario;
    return usuarioRole;
  }

  async updateRoleByUserUuid(
    usuario: UsuarioEntity,
    roles: string[],
  ): Promise<any> {
    await this.adicionarRoleAoUsuario(usuario, roles);
    return true;
  }

  async getRolesByUserUuid(
    usuario: UsuarioEntity,
  ): Promise<UsuarioRoleEntity[]> {
    return await this.usuarioRoleRepository.find({
      where: { usuario: usuario },
      relations: ['roles'],
      select: {
        roles: {
          uuid: true,
          nome: true,
        },
      },
    });
  }
}
