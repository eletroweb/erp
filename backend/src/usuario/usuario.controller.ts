import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioResponseDto } from './dto/usuario.response.dto';
import { UsuarioRequestDto } from './dto/usuario.request.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UsuarioRoleResponseDto } from './roles/usuario.role.response.dto';
import { UsuarioRoleService } from './roles/usuario.role.service';
import { GetCurrentUser } from '../auth/decorator/user.decorator';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly usuarioRoleService: UsuarioRoleService,
  ) { }

  @Get()
  @Roles({ roles: ['MASTER', 'LISTAR_USUARIO'] })
  async findAll(
    @GetCurrentUser() usuarioLogado: UsuarioResponseDto,
  ): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioService.findAll(usuarioLogado);
    const usuariosDto: UsuarioResponseDto[] = usuarios.map((usuario) =>
      usuario.toDto(),
    );
    return usuariosDto;
  }

  @Post()
  @Roles({ roles: ['MASTER', 'CADASTRAR_USUARIO'] })
  async create(
    @GetCurrentUser() usuarioLogado: UsuarioResponseDto,
    @Body() request: UsuarioRequestDto,
  ): Promise<string> {
    await this.usuarioService.create(request, usuarioLogado);
    return 'Usuario criado com sucesso';
  }

  @Get(':uuid')
  @Roles({ roles: ['MASTER', 'EDITAR_USUARIO'] })
  async findOne(@Param('uuid') uuid: string): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioService.findOneByUuid(uuid);
    if (!usuario) throw new NotFoundException('Usuario não localizado');

    return usuario.toDto();
  }

  @Put(':uuid')
  @Roles({ roles: ['MASTER', 'EDITAR_USUARIO'] })
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() request: UsuarioRequestDto,
  ): Promise<string> {
    const updatedUsuario = await this.usuarioService.update(uuid, request);
    return JSON.stringify(updatedUsuario);
  }

  @Delete(':uuid')
  async remove(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<string> {
    const deletedUsuario = await this.usuarioService.remove(uuid);
    return JSON.stringify(deletedUsuario);
  }

  // Roles do usuário
  @Put('roles/:uuid')
  @Roles({ roles: ['MASTER', 'EDITAR_USUARIO'] })
  async updateRoles(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() request: string[],
  ): Promise<string> {
    const usuario = await this.usuarioService.findOneByUuid(uuid);
    await this.usuarioRoleService.updateRoleByUserUuid(usuario, request);
    return JSON.stringify({ message: 'Papeis atualizados com sucesso' });
  }

  @Get('roles/getRolesByUserUuid/:uuid')
  @Roles({ roles: ['MASTER', 'EDITAR_USUARIO'] })
  async getRolesByUserUuid(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<UsuarioRoleResponseDto[]> {
    const usuario = await this.usuarioService.findOneByUuid(uuid);
    const usuariosEntityList =
      await this.usuarioRoleService.getRolesByUserUuid(usuario);
    const response: UsuarioRoleResponseDto[] = usuariosEntityList.map(
      (role) => {
        const usuarioRole: UsuarioRoleResponseDto = role.roles;
        return usuarioRole;
      },
    );
    return response;
  }
}
