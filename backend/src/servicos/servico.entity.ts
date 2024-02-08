import { SetorEntity } from 'src/setores/setor.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, JoinColumn, ManyToOne, Decimal128 } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ServicoResponseDto } from './servico.response.dto';
import { ServicoRequestDto } from './servico.request.dto';

@Entity('servicos')
export class ServicoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({ type: 'int', default: 1 })
  situacao: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column ({type: 'int'})
  contrato_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0, nullable: true })
  data_cadastro?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', precision: 0, nullable: true })
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
      situacao: this.situacao,
      valor: this.valor,
      contrato_id: this.contrato_id,
      setor: this.setor
    };
  }

  static fromRequestDto(dto: ServicoRequestDto, setor: SetorEntity): ServicoEntity {
    const entity = new ServicoEntity();
    entity.descricao = dto.descricao;    
    entity.situacao = dto.situacao || 1;
    entity.setor = setor
    return entity;
  }
}