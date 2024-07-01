/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { UsuarioRoleEntity } from 'src/usuario/roles/usuario.roles.entity';
import { UsuarioRoleRepository } from 'src/usuario/roles/usuario.role.repository';
import { ModuloModule } from 'src/app/modulo/modulo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UsuarioRoleEntity]),
    ModuloModule,
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, UsuarioRoleRepository],
  exports: [RoleService],
})
export class RoleModule { }
