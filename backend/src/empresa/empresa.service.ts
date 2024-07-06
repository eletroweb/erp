import { Injectable } from '@nestjs/common';
import { EmpresaEntity } from './empresa.entity';
import { UsuareioLogado } from 'src/usuario/usuario.logado';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { EmpresaUsuarioService } from './empresausuario/empresa.usuario.service';

@Injectable()
export class EmpresaService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly empresaUsuarioService: EmpresaUsuarioService,
    @InjectRepository(EmpresaEntity)
    private readonly empresaRepository: Repository<EmpresaEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) { }

  async create(
    request: EmpresaEntity,
    usuarioLogado: UsuareioLogado,
  ): Promise<EmpresaEntity> {
    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    if (empresa.length == 0) {
      const usuario = await this.usuarioService.findOneByUuid(usuarioLogado.sub);
      const empresaSalva = await this.empresaUsuarioService.associarEmpresaAoUsuarioMaster(usuario, request);
      return empresaSalva
    }
    Object.assign(empresa[0], request);
    const empresa_salva = await this.empresaRepository.save(empresa[0]);
    return empresa_salva
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