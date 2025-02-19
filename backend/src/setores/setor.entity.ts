import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SetorResponseDto } from './setor.response.dto';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { EmpresaEntity } from 'src/empresa/empresa.entity';

@Entity('setores')
export class SetorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({
    type: 'enum',
    enum: SituacaoEnum,
    default: SituacaoEnum.ATIVO,
  })
  situacao: SituacaoEnum;

  @ManyToOne(() => EmpresaEntity)
  @JoinColumn()
  empresa: EmpresaEntity

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  data_cadastro: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  data_atualizacao: Date;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  toDto(): SetorResponseDto {
    return {
      uuid: this.uuid,
      descricao: this.descricao,
      situacao: this.situacao == SituacaoEnum.ATIVO,
    };
  }
}
