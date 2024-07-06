import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { EmpresaResponseDto } from './empresa.response.dto';
import { EmpresaUsuarioEntity } from './empresausuario/empresa.usuario.entity';
import { EmpresaRequestDto } from './empresa.request.dto';

@Entity('empresas')
export class EmpresaEntity {
  @OneToMany(
    () => EmpresaUsuarioEntity,
    (empresaUsuario) => empresaUsuario.empresa,
  )
  usuarios: EmpresaUsuarioEntity[];

  @OneToOne(() => UsuarioEntity)
  @JoinColumn()
  usuario: UsuarioEntity;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36, nullable: true })
  uuid: string;

  @Column({ unique: true })
  razaoSocial: string;

  @Column({ unique: true })
  nomeFantasia: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  email: string;

  @Column()
  cep: string;

  @Column()
  estado: string;

  @Column()
  cidade: string;

  @Column()
  endereco: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ nullable: true })
  logomarca: string;

  @Column({
    type: 'enum',
    enum: SituacaoEnum,
    default: SituacaoEnum.ATIVO,
  })
  situacao: SituacaoEnum;

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

  toDto(): EmpresaResponseDto {
    const dto: EmpresaResponseDto = {
      id: this.id,
      uuid: this.uuid,
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj,
      email: this.email,
      cep: this.cep,
      estado: this.estado,
      cidade: this.cidade,
      endereco: this.endereco,
      numero: this.numero,
      complemento: this.complemento,
      logomarca: this.logomarca,
      situacao: this.situacao,
    };
    return dto;
  }

  static toEntity(dto: EmpresaRequestDto): EmpresaEntity {
    const entity = new EmpresaEntity();
    entity.razaoSocial = dto.razaoSocial;
    entity.nomeFantasia = dto.nomeFantasia;
    entity.cnpj = dto.cnpj;
    entity.email = dto.email;
    entity.cep = dto.cep;
    entity.estado = dto.estado;
    entity.cidade = dto.cidade;
    entity.endereco = dto.endereco;
    entity.numero = dto.numero;
    entity.complemento = dto.complemento;
    entity.logomarca = dto.logomarca;
    return entity;
  }
}
