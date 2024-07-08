import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository, Transaction } from 'typeorm';
import { UsuarioRequestDto } from './dto/usuario.request.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioRoleService } from './roles/usuario.role.service';
import { EmpresaUsuarioService } from 'src/empresa/empresausuario/empresa.usuario.service';
import { UsuarioLogado } from './dto/usuario.response.dto';
import { SignupRequestDto } from 'src/auth/signup.request.dto';
import { Role } from 'src/enum/role.enum';
import { UsuarioExistenteException } from './exception/usuario.existente.exception';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    private readonly usuarioRoleService: UsuarioRoleService,
    private readonly empresaUsuarioService: EmpresaUsuarioService,
  ) { }

  async findAll(usuarioLogado: UsuarioLogado): Promise<UsuarioEntity[]> {
    const empresasIds = await this.empresaUsuarioService.findAllEmpresaIdListByUsuarioLogado(usuarioLogado.sub)

    return this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.roles', 'roles')
      .leftJoinAndSelect('roles.roles', 'subRoles')
      .innerJoinAndSelect('usuario.empresasUsuarios', 'empresasUsuarios')
      .innerJoinAndSelect('empresasUsuarios.empresa', 'empresa')
      .where('empresa.id IN (:...empresasIds)', { empresasIds })
      .getMany();
  }

  async findOne(id: number): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async findByEmail(email: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async findOneByUuid(uuid: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { uuid },
      relations: ['roles', 'roles.roles'],
    });
    if (!usuario) {
      throw new NotFoundException('Usuario não localizado');
    }
    return usuario;
  }

  async findOneByUuidWithEmpresas(uuid: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { uuid },
      relations: ['roles', 'roles.roles', 'empresasUsuarios', 'empresasUsuarios.empresa'],
    });
    if (!usuario) {
      throw new NotFoundException('Usuario não localizado');
    }
    return usuario;
  }

  async findOneByEmail(email: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      relations: ['roles', 'roles.roles'],
    });
    if (!usuario) {
      throw new NotFoundException('Usuario não localizado');
    }
    return usuario;
  }

  async findOneByEmailOrUsername(email: string, username: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: [{ email }, { username }],
    });
    if (!usuario) {
      throw new NotFoundException('Usuário não localizado');
    }
    return usuario;
  }

  async signup(
    request: SignupRequestDto,
  ): Promise<UsuarioEntity> {
    // this.logger.debug('Iniciando criação do usuário');
    const username = request.email.split('@')[0].toLowerCase();
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: [{ email: request.email }, { username }],
    });
    if (usuarioExistente)
      throw new UsuarioExistenteException()

    const usuario = UsuarioEntity.toEntity(request);
    usuario.password = await this.encryptPassword(request.password);
    const savedUsuario = await this.usuarioRepository.save(usuario);

    await this.usuarioRoleService.adicionarRoleAoUsuario(
      savedUsuario,
      [Role.MASTER],
    );

    //await this.empresaUsuarioService.associarEmpresaAoUsuarioMaster(savedUsuario, request.empresa);
    return await savedUsuario;
  }

  async create(
    request: UsuarioRequestDto,
    usuarioLogado: UsuarioLogado
  ): Promise<UsuarioEntity> {
    this.logger.debug('Iniciando criação do usuário');
    const usuario = UsuarioEntity.toEntity(request);
    usuario.password = await this.encryptPassword(request.password);

    const savedUsuario = await this.usuarioRepository.save(usuario);
    await this.usuarioRoleService.adicionarRoleAoUsuario(
      savedUsuario,
      request.roles,
    );

    const master = await this.findOneByUuidWithEmpresas(usuarioLogado.sub);

    await this.empresaUsuarioService.associateEmpresaWithUsuario(master, usuario);

    return savedUsuario;
  }

  // TODO mover este metodo
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async update(
    uuid: string,
    request: UsuarioRequestDto,
  ): Promise<UsuarioEntity> {
    const usuarioBase = await this.findOneByUuid(uuid);
    const usuarioEditado = this.mergeUsuario(
      usuarioBase,
      UsuarioEntity.toEntity(request),
    );
    if (request.password != null) {
      usuarioEditado.password = await this.encryptPassword(request.password);
    }

    try {
      await this.usuarioRepository.save(usuarioEditado);
      await this.usuarioRoleService.adicionarRoleAoUsuario(
        usuarioEditado,
        request.roles,
      );
    } catch (error) {
      throw new Error('Erro ao salvar o usuário: ' + error.message);
    }

    return usuarioEditado;
  }

  private mergeUsuario(
    usuarioBase: UsuarioEntity,
    usuarioEditado: UsuarioEntity,
  ): UsuarioEntity {
    return this.usuarioRepository.merge(usuarioBase, usuarioEditado);
  }

  async remove(uuid: string): Promise<UsuarioEntity> {
    const usuario = await this.findOneByUuid(uuid);
    return this.usuarioRepository.remove(usuario);
  }

  async me(uuid: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({
      where: { uuid },
      relations: ['empresasUsuarios', 'empresasUsuarios.empresa'],
    });

    const response = {
      has_company: usuario.empresasUsuarios.length > 0
    }

    return response;
  }
}
