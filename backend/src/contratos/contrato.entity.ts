import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ContratoResponseDto } from './contrato.response.dto';
import { ContratoRequestDto } from './contrato.request.dto';

@Entity('contratos')
export class ContratoEntity {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  descricao: string;

  @Column({ type: 'int', default: 1 })
  situacao: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  orcamento: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  data_inicio: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  data_fim: Date;

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

  static fromRequestDto(dto: ContratoRequestDto): ContratoEntity {
    const contratoEntity = new ContratoEntity();
    contratoEntity.descricao = dto.descricao;
    contratoEntity.situacao = dto.situacao || 1;
    contratoEntity.orcamento = dto.orcamento;
    contratoEntity.data_inicio = dto.data_inicio;
    contratoEntity.data_fim = dto.data_fim;

    return contratoEntity;
  }

  toDto(): ContratoResponseDto {
    const contratoDto = new ContratoResponseDto();
    contratoDto.uuid = this.uuid;
    contratoDto.descricao = this.descricao;
    contratoDto.situacao = this.situacao;
    contratoDto.orcamento = this.orcamento;
    contratoDto.data_inicio = this.data_inicio;
    contratoDto.data_fim = this.data_fim;
    contratoDto.data_cadastro = this.data_cadastro;
    contratoDto.data_atualizacao = this.data_atualizacao;

    return contratoDto;
  }
}
