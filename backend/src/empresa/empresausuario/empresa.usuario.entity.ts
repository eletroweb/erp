import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmpresaEntity } from '../empresa.entity';

@Entity('empresas_usuarios')
export class EmpresaUsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.empresasUsuarios)
  usuario: UsuarioEntity;

  @ManyToOne(() => EmpresaEntity)
  empresa: EmpresaEntity;

  @Column({ type: 'boolean', default: false, transformer: {
    from: (value: number) => value === 1,
    to: (value: boolean) => value ? 1 : 0,
  } })
  proprietario: boolean;
}
