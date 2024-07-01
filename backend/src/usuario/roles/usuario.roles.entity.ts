/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { RoleEntity } from 'src/auth/role/role.entity';
import { UsuarioEntity } from '../usuario.entity';
import { UsuarioRoleResponseDto } from './usuario.role.response.dto';

@Entity('usuarios_roles')
export class UsuarioRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.roles)
  usuario: UsuarioEntity;

  @Column({ type: 'int' })
  role_id: number;

  @ManyToOne(() => RoleEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  roles: RoleEntity;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static toEntity(role: number, usuario: UsuarioEntity): UsuarioRoleEntity {
    const usuarioRole = new UsuarioRoleEntity();
    usuarioRole.role_id = role;
    usuarioRole.usuario = usuario;
    return usuarioRole;
  }
}
