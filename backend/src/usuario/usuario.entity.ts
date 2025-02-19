import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioLogado } from './dto/usuario.response.dto';
import { UsuarioRoleEntity } from './roles/usuario.roles.entity';
import { SituacaoEnum } from 'src/enum/situacao.enum';
import { EmpresaUsuarioEntity } from 'src/empresa/empresausuario/empresa.usuario.entity';
import { EmpresaEntity } from 'src/empresa/empresa.entity';
import { SignupRequestDto } from 'src/auth/signup.request.dto';
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

  @OneToOne(() => EmpresaEntity, empresa => empresa.usuario)
  empresa: EmpresaEntity;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static toEntity(request: SignupRequestDto): UsuarioEntity {
    const usuario = new UsuarioEntity();
    usuario.nome = request.nome;
    usuario.username = request.email.split('@')[0].toLowerCase();
    usuario.email = request.email;
    usuario.password = request.password;
    return usuario;
  }

  toDto(): UsuarioLogado {
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
