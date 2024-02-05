// usuario.controller.ts
import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, Res, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioResponseDto } from './usuario.response.dto';
import { UsuarioRequestDto } from './usuario.request.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  async findAll(): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioService.findAll();
    const usuariosDto: UsuarioResponseDto[] = usuarios.map(usuario => usuario.toDto());
    return usuariosDto;
  }

  @Post()
  async create(@Body() request: UsuarioRequestDto): Promise<string> {
    const createdUsuario = await this.usuarioService.create(request);
    return JSON.stringify(createdUsuario);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioService.findOneByUuid(uuid);
    if (!usuario)
      throw new NotFoundException('Usuario not found');
    
    return usuario.toDto();
  }

  @Put(':uuid')
  async update(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string, @Body() usuarioEntity: UsuarioEntity): Promise<string> {
    const updatedUsuario = await this.usuarioService.update(uuid, usuarioEntity);
    return JSON.stringify(updatedUsuario);
  }

  @Delete(':uuid')
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<string> {
    const deletedUsuario = await this.usuarioService.remove(uuid);
    return JSON.stringify(deletedUsuario);
  }
}
