import { Injectable } from '@nestjs/common';
import { EmpresaUsuarioRepository } from './empresa.usuario.repository';
import { EmpresaUsuarioEntity } from './empresa.usuario.entity';
import { UsuarioRepository } from '../auth/usuarios/usuario.repository';
import { EmpresaRepository } from './empresa.repository';

@Injectable()
export class EmpresaUsuarioService {
  constructor(
    private empresaUsuarioRepository: EmpresaUsuarioRepository,
    private empresaRepository: EmpresaRepository,
    private usuarioRepository: UsuarioRepository,
  ) {}

  async associateEmpresaWithUsuario(
    empresaUuid: string,
    usuarioUuid: string,
  ): Promise<void> {
    const empresa = await this.empresaRepository.findOne({
      where: { uuid: empresaUuid },
    });
    const usuario = await this.usuarioRepository.findOne({
      where: { uuid: usuarioUuid },
    });

    if (!empresa || !usuario) {
      throw new Error('Empresa or usuario does not exist');
    }

    const empresaUsuario = new EmpresaUsuarioEntity();
    empresaUsuario.empresa = empresa;
    empresaUsuario.usuario = usuario;

    await this.empresaUsuarioRepository.save(empresaUsuario);
  }
}
