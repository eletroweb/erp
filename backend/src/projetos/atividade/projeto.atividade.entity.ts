import { SetorEntity } from 'src/setores/setor.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Situacao } from 'src/enum/situacao.enum';
import { ProjetoEntity } from '../projeto.entity';
import { ProjetoAtividadeResponseDto } from './projeto.atividade.response.dto';

@Entity('projetos_atividades')
export class ProjetoAtividadeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ nullable: false, length: 100 })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @ManyToOne(() => ProjetoEntity, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projeto_id' })
  projeto: ProjetoEntity;

  @ManyToOne(() => SetorEntity, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'setor_id' })
  setor: SetorEntity;

  @Column({ nullable: false, default: 0 })
  situacao: Situacao;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  orcamento: number;

  @Column({ nullable: true, type: 'date' })
  data_inicio: Date;

  @Column({ nullable: true, type: 'date' })
  data_fim: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  data_cadastro: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', precision: 0 })
  data_atualizacao: Date;

  toDto(): ProjetoAtividadeResponseDto {
    const projetoDto = new ProjetoAtividadeResponseDto();
    projetoDto.uuid = this.uuid;
    projetoDto.projeto =  this.projeto?.uuid
    projetoDto.setor = this.setor.toDto()
    projetoDto.situacao = this.situacao == Situacao.ATIVO;
    projetoDto.data_inicio = this.data_inicio;
    projetoDto.data_fim = this.data_fim;
    projetoDto.observacao = this.observacao;
    projetoDto.data_cadastro = this.data_cadastro;
    projetoDto.data_atualizacao = this.data_atualizacao;

    return projetoDto;
  }
}
