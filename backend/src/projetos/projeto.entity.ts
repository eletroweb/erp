import { SetorEntity } from 'src/setores/setor.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProjetoResponseDto } from './projeto.response.dto';
import { ProjetoRequestDto } from './projeto.request.dto';
import { ClienteEntity } from 'src/clientes/cliente.entity';
import { UsuarioEntity } from 'src/auth/usuarios/usuario.entity';
import { SituacaoEnum } from 'src/enum/situacao.enum';

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

  @Column({ type: 'text', nullable: true })
  responsavel: string;

  @Column({
    type: 'enum',
    enum: SituacaoEnum,
    default: SituacaoEnum.ATIVO
  })
  situacao: SituacaoEnum;

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

  static fromRequestDto(
    dto: ProjetoRequestDto,
    setor: SetorEntity,
    cliente: ClienteEntity
  ): ProjetoEntity {
    const entity = new ProjetoEntity();
    entity.cliente = cliente;
    entity.setor = setor;
    entity.responsavel = dto.responsavel;
    entity.situacao = dto.situacao == true ? SituacaoEnum.ATIVO : SituacaoEnum.INATIVO;
    entity.orcamento = dto.orcamento;
    entity.data_inicio = dto.data_inicio;
    entity.data_fim = dto.data_fim;
    entity.observacao = dto.observacao;

    return entity;
  }

  toDto(): ProjetoResponseDto {
    const projetoDto = new ProjetoResponseDto();
    projetoDto.uuid = this.uuid;
    projetoDto.cliente = this.cliente?.toDto()
    projetoDto.setor = this.setor.toDto()
    projetoDto.responsavel = this.responsavel;
    projetoDto.situacao = this.situacao == SituacaoEnum.ATIVO;
    projetoDto.orcamento = this.orcamento;
    projetoDto.data_inicio = this.data_inicio;
    projetoDto.data_fim = this.data_fim;
    projetoDto.observacao = this.observacao;
    projetoDto.data_cadastro = this.data_cadastro;
    projetoDto.data_atualizacao = this.data_atualizacao;

    return projetoDto;
  }
}