import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ColaboradorResponseDto } from './colaborador.response.dto';
import { ColaboradorRequestDto } from './colaborador.request.dto';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { EmpresaEntity } from 'src/empresa/empresa.entity';

@Entity('colaboradores')
export class ColaboradorEntity {
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

  @Column({ type: 'varchar', length: 50, nullable: true })
  cargo: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  salario: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  valor_hora: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacao: string;

  @Column({
    type: 'enum',
    enum: SituacaoEnum,
  })
  situacao: SituacaoEnum;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
    nullable: true,
  })
  data_cadastro?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: 0,
    nullable: true,
  })
  data_atualizacao?: Date;

  @ManyToOne (() => EmpresaEntity, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({name: 'empresa_id'})
  empresa: EmpresaEntity

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  toDto(): ColaboradorResponseDto {
    return {
      uuid: this.uuid,
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      documento: this.documento,
      cargo: this.cargo,
      salario: this.salario,
      valor_hora: this.valor_hora,
      observacao: this.observacao,
      situacao: this.situacao == SituacaoEnum.ATIVO,
    };
  }

  static fromRequestDto(dto: ColaboradorRequestDto): ColaboradorEntity {
    const entity = new ColaboradorEntity();
    entity.nome = dto.nome;
    entity.email = dto.email;
    entity.telefone = dto.telefone;
    entity.documento = dto.documento;
    entity.cargo = dto.cargo;
    entity.salario = dto.salario;
    entity.valor_hora = dto.valor_hora;
    entity.observacao = dto.observacao;
    entity.situacao =
      dto.situacao == true ? SituacaoEnum.ATIVO : SituacaoEnum.INATIVO;
    return entity;
  }
}
