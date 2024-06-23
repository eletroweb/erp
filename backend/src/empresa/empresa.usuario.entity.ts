import { UsuarioEntity } from 'src/auth/usuarios/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmpresaEntity } from './empresa.entity';

@Entity('empresas_usuarios')
export class EmpresaUsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsuarioEntity)
  usuario: UsuarioEntity;

  @ManyToOne(() => EmpresaEntity)
  empresa: EmpresaEntity;

  @Column()
  usuario_id: number;

  @Column()
  empresa_id: number;
}
