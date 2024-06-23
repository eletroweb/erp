import { UsuarioEntity } from 'src/auth/usuarios/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EmpresaResponseDto } from './empresa.response.dto';

@Entity('empresas')
export class EmpresaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  razao_social: string;

  @Column({ type: 'varchar', length: 100 })
  nome_fantasia: string;

  @Column({ type: 'char', length: 18 })
  cnpj: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'char', length: 9 })
  cep: string;

  @Column({ type: 'varchar', length: 2 })
  estado: string;

  @Column({ type: 'varchar', length: 100 })
  cidade: string;

  @Column({ type: 'varchar', length: 100 })
  endereco: string;

  @Column({ type: 'varchar', length: 10 })
  numero: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  complemento: string;

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.empresas)
  @JoinTable({
    name: 'usuario_empresas',
    joinColumn: { name: 'empresa_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
  })
  usuarios: UsuarioEntity[];

  @CreateDateColumn()
  data_cadastro: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  toDto(): EmpresaResponseDto {
    return {
      id: this.id,
      razao_social: this.razao_social,
      nome_fantasia: this.nome_fantasia,
      cnpj: this.cnpj,
      email: this.email,
      cep: this.cep,
      estado: this.estado,
      cidade: this.cidade,
      endereco: this.endereco,
      numero: this.numero,
      complemento: this.complemento,
      data_cadastro: this.data_cadastro,
      data_atualizacao: this.data_atualizacao,
    };
  }
}
