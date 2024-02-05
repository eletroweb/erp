// usuario.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioRequestDto } from './usuario.request.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
  ) { }

  async findAll(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({ where: { uuid } });
    if (!usuario) {
      throw new NotFoundException('Usuario not found');
    }
    return usuario;
  }

  async create(request: UsuarioRequestDto): Promise<UsuarioEntity> {
    const usuario = UsuarioEntity.fromRequestDto(request);
    const createdUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(createdUsuario);
  }

  async update(uuid: string, usuarioEntity: UsuarioEntity): Promise<UsuarioEntity> {
    await this.findOneByUuid(uuid); // Verifica se o usuario existe
    const updatedUsuario = await this.usuarioRepository.save({ ...usuarioEntity, uuid });
    return updatedUsuario;
  }

  async remove(uuid: string): Promise<UsuarioEntity> {
    const usuario = await this.findOneByUuid(uuid); // Verifica se o usuario existe
    return this.usuarioRepository.remove(usuario);
  }
}
