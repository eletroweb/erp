import { SetorEntity } from 'src/setores/setor.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClienteResponseDto } from './cliente.response.dto';
import { ClienteRequestDto } from './cliente.request.dto';
import { Situacao } from 'src/enum/situacao.enum';
import { EnderecoResponse } from 'src/app/endereco.response';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  telefone: string;

  @Column({ type: 'varchar', length: 20 })
  documento: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  estado: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cidade: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  endereco: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  complemento: string;

  @Column({ type: 'varchar', length: 9 })
  cep: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bairro: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  numero: string;

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

  toDto(): ClienteResponseDto {
    const endereco = new EnderecoResponse();
    endereco.endereco = this.endereco;
    endereco.cep = this.cep;
    endereco.bairro = this.bairro;
    endereco.cidade = this.cidade;
    endereco.complemento = this.complemento;
    endereco.numero = this.numero;

    return {
      uuid: this.uuid,
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      documento: this.documento,
      situacao: this.situacao == Situacao.ATIVO,
      setor: this.setor?.toDto(),
      endereco
    };
  }

  static fromRequestDto(dto: ClienteRequestDto, setor: SetorEntity): ClienteEntity {
    const entity = new ClienteEntity();
    entity.nome = dto.nome;
    entity.email = dto.email;
    entity.telefone = dto.telefone;
    entity.documento = dto.documento;
    entity.estado = dto.endereco.estado;
    entity.cidade = dto.endereco.cidade;
    entity.endereco = dto.endereco.endereco;
    entity.complemento = dto.endereco.complemento;
    entity.situacao = dto.situacao == true ? Situacao.ATIVO : Situacao.INATIVO;
    entity.setor = setor;
    entity.cep = dto.endereco.cep;
    entity.numero = dto.endereco.numero;
    entity.bairro = dto.endereco.bairro;
    return entity;
  }
}