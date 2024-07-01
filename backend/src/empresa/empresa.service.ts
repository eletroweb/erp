import { Injectable } from '@nestjs/common';
import { EmpresaEntity } from './empresa.entity';
import { UsuareioLogado } from 'src/usuario/usuario.logado';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EmpresaUsuarioService } from './empresausuario/empresa.usuario.service';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(EmpresaEntity)
    private readonly empresaRepository: Repository<EmpresaEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) { }

  async create(
    request: EmpresaEntity,
    usuarioLogado: UsuareioLogado,
  ): Promise<EmpresaEntity> {
    const empresa = await this.findOne(usuarioLogado.sub);
    if (!empresa) {
      /*const usuario = await this.usuarioService.findOneByUuid(
        usuarioLogado.sub,
      );
      request.usuario = usuario;*/
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
    const empresa = await this.findEmpresaByUsuarioLogado(usuarioLogado);
    if (empresa) {
      empresa.logomarca = logomarca;
      return await this.empresaRepository.save(empresa);
    }

    /*const request = new EmpresaEntity();
    request.uuid = usuarioLogado.sub;
    request.logomarca = logomarca;
    return await this.empresaRepository.save(request);*/
  }

  async findOne(uuid: string): Promise<EmpresaEntity | null> {
    const empresa = await this.empresaRepository.findOne({ where: { uuid } });
    return empresa || null;
  }

  async getLogoPath(usuarioLogado: UsuareioLogado,): Promise<string> {
    const empresa = await this.findEmpresaByUsuarioLogado(usuarioLogado);
    if (!empresa || !empresa.logomarca)
      throw new Error('Logomarca não encontrada para a empresa ' + empresa.uuid);

    return `${process.cwd()}/uploads/empresa/logomarca/${empresa.logomarca}`;
  }

  async findEmpresaByUsuarioLogado(
    usuarioLogado: UsuareioLogado,
  ): Promise<EmpresaEntity> {
    const empresaData = await this.entityManager.query(
      `SELECT e.* FROM empresas e
      JOIN empresas_usuarios eu ON eu.empresaId = e.id
      JOIN usuarios u ON u.id = eu.usuarioId
      WHERE u.uuid = ?`, [usuarioLogado.sub]
    );

    return await this.entityManager.findOne(EmpresaEntity, { where: { id: empresaData[0].id } });
  }

}
