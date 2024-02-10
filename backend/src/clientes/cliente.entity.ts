import { SetorEntity } from 'src/setores/setor.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClienteResponseDto } from './cliente.response.dto';
import { ClienteRequestDto } from './cliente.request.dto';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  documento: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  estado: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cidade: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  endereco: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  complemento: string;

  @Column({ type: 'int', default: 1 })
  situacao: number;

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
    return {
      uuid: this.uuid,
      nome: this.nome,
      email: this.email,
      documento: this.documento,
      estado: this.estado,
      cidade: this.cidade,
      endereco: this.endereco,
      complemento: this.complemento,
      situacao: this.situacao,
      setor: this.setor?.toDto()
    };
  }

  static fromRequestDto(dto: ClienteRequestDto, setor: SetorEntity): ClienteEntity {
    const entity = new ClienteEntity();
    entity.nome = dto.nome;
    entity.email = dto.email;
    entity.documento = dto.documento;
    entity.estado = dto.estado;
    entity.cidade = dto.cidade;
    entity.endereco = dto.endereco;
    entity.complemento = dto.complemento;
    entity.situacao = dto.situacao || 1;
    entity.setor = setor
    return entity;
  }
}