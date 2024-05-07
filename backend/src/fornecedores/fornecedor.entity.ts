import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, JoinColumn,ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { FornecedorResponseDto } from './fornecedor.response.dto';
import { FornecedorRequestDto } from './fornecedor.request.dto';
import { Situacao } from 'src/enum/situacao.enum';

@Entity('fornecedores')
export class FornecedorEntity {
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

  @Column({
    type: 'enum',
    enum: Situacao,
  })
  situacao: Situacao;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0, nullable: true })
  data_cadastro?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', precision: 0, nullable: true })
  data_atualizacao?: Date;

  
  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  toDto(): FornecedorResponseDto {
    return {
      uuid: this.uuid,
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      documento: this.documento,
      estado: this.estado,
      cidade: this.cidade,
      endereco: this.endereco,
      complemento: this.complemento,
      situacao: this.situacao == Situacao.ATIVO,
    };
  }

  static fromRequestDto(dto: FornecedorRequestDto): FornecedorEntity {
    const entity = new FornecedorEntity();
    entity.nome = dto.nome;
    entity.email = dto.email;
    entity.telefone = dto.telefone;
    entity.documento = dto.documento;
    entity.estado = dto.estado;
    entity.cidade = dto.cidade;
    entity.endereco = dto.endereco;
    entity.complemento = dto.complemento;
    entity.situacao = dto.situacao == true ? Situacao.ATIVO : Situacao.INATIVO;
    return entity;
  }
}