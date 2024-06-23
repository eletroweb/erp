/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuloEntity } from './module.entity';
import { ModuloController } from './modulo.controller';
import { ModuloService } from './module.service';
import { ModuloRepository } from './modulo.repository';
import { UsuarioService } from 'src/auth/usuarios/usuario.service';
import { EmpresaService } from 'src/empresa/empresa.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModuloEntity])],
  controllers: [ModuloController],
  providers: [ModuloService, ModuloRepository],
  exports: [ModuloRepository, ModuloService],
})
export class ModuloModule {}
