import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioResponseDto } from './dto/usuario.response.dto';
import { UsuarioRoleEntity } from './roles/usuario.roles.entity';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { UsuarioCreateRequestDto } from './dto/usuario.create.request.dto';
import { EmpresaUsuarioEntity } from 'src/empresa/empresausuario/empresa.usuario.entity';
@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

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

  @OneToMany(() => UsuarioRoleEntity, (role) => role.usuario, {
    cascade: true,
  })
  roles: UsuarioRoleEntity[];

  @OneToMany(() => EmpresaUsuarioEntity, (empresaUsuario) => empresaUsuario.usuario)
  empresasUsuarios: EmpresaUsuarioEntity[];

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static toEntity(request: UsuarioCreateRequestDto): UsuarioEntity {
    const usuario = new UsuarioEntity();
    usuario.nome = request.nome;
    usuario.username = request.username;
    usuario.email = request.email;
    usuario.password = request.password;
    return usuario;
  }

  toDto(): UsuarioResponseDto {
    return {
      uuid: this.uuid,
      sub: this.uuid,
      nome: this.nome,
      username: this.username,
      email: this.email,
      situacao: this.situacao,
      roles: this.roles.map((role) => role.roles.nome),
    };
  }
}
