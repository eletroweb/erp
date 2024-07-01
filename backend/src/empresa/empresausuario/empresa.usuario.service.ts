import { Injectable } from '@nestjs/common';
import { EmpresaEntity } from '../empresa.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpresaRequestDto } from '../empresa.request.dto';
import { EmpresaUsuarioEntity } from './empresa.usuario.entity';
import { EmpresaExistenteException } from 'src/usuario/exception/empresa.existente.exception';

@Injectable()
export class EmpresaUsuarioService {
  constructor(
    @InjectRepository(EmpresaEntity)
    private empresaRepository: Repository<EmpresaEntity>,

    @InjectRepository(EmpresaUsuarioEntity)
    private empresaUsuarioRepository: Repository<EmpresaUsuarioEntity>,
  ) { }

  async associarEmpresaAoUsuarioMaster(
    usuario: UsuarioEntity,
    empresaDto: EmpresaRequestDto
  ): Promise<EmpresaEntity> {

    const empresaExistente = await this.empresaRepository.findOne({ where: { cnpj: empresaDto.cnpj } });
    if (empresaExistente)
      throw new EmpresaExistenteException()

    const empresaEntity = EmpresaEntity.toEntity(empresaDto);
    empresaEntity.usuario = usuario;
    empresaEntity.uuid = usuario.uuid;

    const empresa = await this.empresaRepository.save(empresaEntity);

    const empresaUsuario = new EmpresaUsuarioEntity();
    empresaUsuario.empresa = empresa;
    empresaUsuario.usuario = usuario
    empresaUsuario.proprietario = true

    await this.empresaUsuarioRepository.save(empresaUsuario);

    return empresa
  }

  async associateEmpresaWithUsuario(
    master: UsuarioEntity,
    usuario: UsuarioEntity
  ): Promise<EmpresaUsuarioEntity> {

    const empresa = master.empresasUsuarios[0].empresa;

    const empresaUsuario = new EmpresaUsuarioEntity();
    empresaUsuario.empresa = empresa;
    empresaUsuario.usuario = usuario;

    return await this.empresaUsuarioRepository.save(empresaUsuario);
  }

  async findAllByUsuarioLogado(uuid: string): Promise<number[]> {
    const userCompanies = await this.empresaUsuarioRepository.find({
      where: { usuario: { uuid } },
      relations: ['empresa'],
    });

    return userCompanies.map((empresaUsuario) => empresaUsuario.empresa.id);
  }
}
