import { SetorEntity } from 'src/setores/setor.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProjetoResponseDto } from './projeto.response.dto';
import { ProjetoRequestDto } from './projeto.request.dto';
import { ClienteEntity } from 'src/clientes/cliente.entity';

@Entity('projetos')
export class ProjetoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @ManyToOne(() => ClienteEntity, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClienteEntity;

  @ManyToOne(() => SetorEntity, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'setor_id' })
  setor: SetorEntity;

  //@ManyToOne(() => ClienteEntity, { nullable: false, onDelete: 'CASCADE' })
  //@JoinColumn({ name: 'responsavel_id' })
  @Column({ type: 'int', default: 1 })
  responsavel: string;

  @Column({ type: 'int', default: 1 })
  situacao: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  orcamento: number;

  @Column({ type: 'date' })
  data_inicio: Date;

  @Column({ type: 'date' })
  data_fim: Date;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  data_cadastro: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', precision: 0 })
  data_atualizacao: Date;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static fromRequestDto(dto: ProjetoRequestDto, setor: SetorEntity, cliente: ClienteEntity): ProjetoEntity {
    const projetoEntity = new ProjetoEntity();
    projetoEntity.cliente = cliente;
    projetoEntity.setor = setor;
    projetoEntity.responsavel = undefined; // TODO carregar usuário da base
    projetoEntity.situacao = dto.situacao || 1;
    projetoEntity.orcamento = dto.orcamento;
    projetoEntity.data_inicio = dto.data_inicio;
    projetoEntity.data_fim = dto.data_fim;
    projetoEntity.observacao = dto.observacao;

    return projetoEntity;
  }

  toDto(): ProjetoResponseDto {
    const projetoDto = new ProjetoResponseDto();
    projetoDto.uuid = this.uuid;
    projetoDto.cliente = this.cliente ? this.cliente.toDto() : null;
    projetoDto.setor = this.setor ? this.setor.toDto() : null;
    //projetoDto.responsavel = this.responsavel ? this.responsavel.toDto() : null;
    projetoDto.situacao = this.situacao;
    projetoDto.orcamento = this.orcamento;
    projetoDto.data_inicio = this.data_inicio;
    projetoDto.data_fim = this.data_fim;
    projetoDto.observacao = this.observacao;
    projetoDto.data_cadastro = this.data_cadastro;
    projetoDto.data_atualizacao = this.data_atualizacao;

    return projetoDto;
  }
}