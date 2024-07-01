import { EntityRepository, Repository } from 'typeorm';
import { EmpresaUsuarioEntity } from './empresa.usuario.entity';

@EntityRepository(EmpresaUsuarioEntity)
export class EmpresaUsuarioRepository extends Repository<EmpresaUsuarioEntity> { }
