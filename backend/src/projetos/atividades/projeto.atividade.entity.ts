import { SetorEntity } from 'src/setores/setor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjetoEntity } from '../projeto.entity';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { ProjetoAtividadesResponseDto } from './projeto.atividade.response';
import { ProjetoAtividadeRequestDto } from './projeto.atividade.request';
import { BaseEntity } from 'src/app/base.entity';

@Entity('projetos_atividades')
export class ProjetoAtividadesEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @ManyToOne(() => ProjetoEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projeto_id' })
  projeto: ProjetoEntity;

  @ManyToOne(() => SetorEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'setor_id' })
  setor: SetorEntity;

  @Column({
    type: 'enum',
    enum: SituacaoEnum,
  })
  situacao: SituacaoEnum;

  @Column({ type: 'date' })
  data_inicio: Date;

  @Column({ type: 'date' })
  data_fim: Date;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  toDto(): ProjetoAtividadesResponseDto {
    const dto = new ProjetoAtividadesResponseDto();
    dto.uuid = this.uuid;
    dto.descricao = this.descricao;
    dto.projeto = this.projeto.toDto();
    dto.setor = this.setor.toDto();
    dto.situacao = this.situacao == SituacaoEnum.ATIVO;
    dto.data_inicio = this.data_inicio;
    dto.data_fim = this.data_fim;
    dto.observacao = this.observacao;
    dto.data_cadastro = this.data_cadastro;
    dto.data_atualizacao = this.data_atualizacao;

    return dto;
  }

  static fromRequestDto(
    dto: ProjetoAtividadeRequestDto,
    projeto: ProjetoEntity,
    setor: SetorEntity,
  ): ProjetoAtividadesEntity {
    const entity = new ProjetoAtividadesEntity();
    entity.descricao = dto.descricao;
    entity.projeto = projeto;
    entity.setor = setor;
    entity.situacao =
      dto.situacao == true ? SituacaoEnum.ATIVO : SituacaoEnum.INATIVO;
    entity.data_inicio = dto.data_inicio;
    entity.data_fim = dto.data_fim;
    entity.observacao = dto.observacao;

    return entity;
  }
}
