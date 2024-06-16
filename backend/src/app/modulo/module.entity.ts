/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { RoleEntity } from '../../auth/role/role.entity';
import { ModuloRequest } from './modulo.request';

@Entity('modulos')
export class ModuloEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 50 })
  nome: string;

  @Column({
    type: 'enum',
    enum: SituacaoEnum,
    default: SituacaoEnum.ATIVO,
  })
  situacao: SituacaoEnum;

  @OneToMany(() => RoleEntity, (role) => role.modulo, { cascade: true })
  roles: RoleEntity[];

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static toEntity(dto: ModuloRequest): ModuloEntity {
    const entity = new ModuloEntity();
    entity.nome = dto.nome;
    entity.situacao = dto.situacao;
    return entity;
  }
}
