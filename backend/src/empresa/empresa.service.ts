import { Injectable } from '@nestjs/common';
import { EmpresaEntity } from './empresa.entity';
import { UsuarioService } from '../auth/usuarios/usuario.service';
import { UsuareioLogado } from 'src/auth/usuarios/usuario.logado';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(EmpresaEntity)
    private readonly empresaRepository: Repository<EmpresaEntity>,
    private readonly usuarioService: UsuarioService,
  ) {}

  async create(
    request: EmpresaEntity,
    usuarioLogado: UsuareioLogado,
  ): Promise<EmpresaEntity> {
    const empresa = await this.findOne(usuarioLogado.sub);
    if (!empresa) {
      const usuario = await this.usuarioService.findOneByUuid(
        usuarioLogado.sub,
      );
      request.usuario = usuario;
      request.uuid = usuarioLogado.sub;
      return await this.empresaRepository.save(request);
    }

    Object.assign(empresa, request);
    return await this.empresaRepository.save(empresa);
  }

  async findOne(uuid: string): Promise<EmpresaEntity | null> {
    const empresa = await this.empresaRepository.findOne({ where: { uuid } });
    return empresa || null;
  }
}
