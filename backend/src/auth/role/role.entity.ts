/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { RoleRequest } from './role.request';
import { ModuloEntity } from '../../app/modulo/module.entity';
import { UsuarioRoleResponseDto } from '../usuarios/roles/usuario.role.response.dto';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 50 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  descricao: string;

  @Column({
    type: 'enum',
    enum: SituacaoEnum,
    default: SituacaoEnum.ATIVO,
  })
  situacao: SituacaoEnum;

  @ManyToOne(() => ModuloEntity, (modulo) => modulo.roles)
  modulo: ModuloEntity;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static toEntity(dto: RoleRequest, modulo: ModuloEntity): RoleEntity {
    const entity = new RoleEntity();
    entity.nome = dto.nome;
    entity.descricao = dto.descricao;
    entity.modulo = modulo;
    entity.situacao = dto.situacao;
    return entity;
  }

  toDto(): UsuarioRoleResponseDto {
    return {
      uuid: this.uuid,
      nome: this.nome,
      descricao: this.descricao,
    };
  }
}
