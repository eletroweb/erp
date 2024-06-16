import { SetorEntity } from 'src/setores/setor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
  Decimal128,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ServicoResponseDto } from './servico.response.dto';
import { ServicoRequestDto } from './servico.request.dto';
import { ContratoEntity } from 'src/contratos/contrato.entity';
import { SituacaoEnum } from 'src/enum/situacao.enum';

@Entity('servicos')
export class ServicoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({
    type: 'enum',
    enum: SituacaoEnum,
    //default: Situacao.ATIVO
  })
  situacao: SituacaoEnum;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @ManyToOne(() => ContratoEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contrato_id' })
  contrato: ContratoEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
    nullable: true,
  })
  data_cadastro?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: 0,
    nullable: true,
  })
  data_atualizacao?: Date;

  @ManyToOne(() => SetorEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'setor_id' })
  setor: SetorEntity;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  toDto(): ServicoResponseDto {
    return {
      uuid: this.uuid,
      descricao: this.descricao,
      situacao: this.situacao == SituacaoEnum.ATIVO,
      valor: this.valor,
      contrato: this.contrato,
      setor: this.setor?.toDto(),
    };
  }

  static fromRequestDto(
    dto: ServicoRequestDto,
    setor: SetorEntity,
    contrato: ContratoEntity,
  ): ServicoEntity {
    const entity = new ServicoEntity();
    entity.descricao = dto.descricao;
    entity.situacao =
      dto.situacao == true ? SituacaoEnum.ATIVO : SituacaoEnum.INATIVO;
    entity.setor = setor;
    entity.valor = dto.valor;
    entity.contrato = contrato;
    return entity;
  }
}
