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
  ) { }

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

  async alterarLogomarca(
    logomarca: string,
    usuarioLogado: UsuareioLogado,
  ): Promise<EmpresaEntity> {
    const empresa = await this.findOne(usuarioLogado.sub);
    if (empresa) {
      empresa.logomarca = logomarca;
      return await this.empresaRepository.save(empresa);
    }

    const usuario = await this.usuarioService.findOneByUuid(usuarioLogado.sub);
    const request = new EmpresaEntity();
    request.usuario = usuario;
    request.uuid = usuarioLogado.sub;
    request.logomarca = logomarca;
    return await this.empresaRepository.save(request);
  }

  async findOne(uuid: string): Promise<EmpresaEntity | null> {
    const empresa = await this.empresaRepository.findOne({ where: { uuid } });
    return empresa || null;
  }

  async getLogoPath(empresaId: string): Promise<string> {
    const empresa = await this.findOne(empresaId);
    if (!empresa || !empresa.logomarca)
      throw new Error('Logomarca não encontrada para a empresa ' + empresaId);

    return `${process.cwd()}/uploads/empresa/logomarca/${empresa.logomarca}`;
  }
}
