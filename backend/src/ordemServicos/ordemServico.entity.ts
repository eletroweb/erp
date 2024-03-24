import { ClienteEntity } from 'src/clientes/cliente.entity';
import { SetorEntity } from 'src/setores/setor.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrdemServicoRequestDto } from './ordemServico.request.dto';
import { OrdemServicoResponseDto } from './ordemServico.response.dto';
import { Situacao } from 'src/enum/situacao.enum';


@Entity('os')
export class OrdemServicoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @ManyToOne(() => ClienteEntity, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClienteEntity;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({
    type: 'enum',
    enum: Situacao,
  })
  situacao: Situacao;

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

  toDto(): OrdemServicoResponseDto {
    const ordemServicoDto = new OrdemServicoResponseDto();
    ordemServicoDto.uuid = this.uuid;
    ordemServicoDto.cliente = this.cliente ? this.cliente.nome : null;
    ordemServicoDto.descricao = this.descricao;
    ordemServicoDto.situacao = this.situacao == Situacao.ATIVO;
    ordemServicoDto.data_cadastro = this.data_cadastro;
    ordemServicoDto.data_atualizacao = this.data_atualizacao;
    ordemServicoDto.setor = this.setor?.toDto()
    return ordemServicoDto;
  }

  static fromRequestDto(
    dto: OrdemServicoRequestDto,
    cliente: ClienteEntity,
    setor: SetorEntity
    ): OrdemServicoEntity {
    const entity = new OrdemServicoEntity();
    entity.cliente = cliente;
    entity.descricao = dto.descricao;
    entity.situacao = dto.situacao == true ? Situacao.ATIVO : Situacao.INATIVO;
    entity.setor = setor;
    return entity;
  }
}

