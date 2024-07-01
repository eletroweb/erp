import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioRoleModule } from './roles/usuario.role.module';
import { EmpresaUsuarioModule } from 'src/empresa/empresausuario/empresa.usuario.module';
import { EmpresaUsuarioService } from 'src/empresa/empresausuario/empresa.usuario.service';
import { EmpresaUsuarioRepository } from 'src/empresa/empresausuario/empresa.usuario.repository';
import { EmpresaRepository } from 'src/empresa/empresa.repository';
import { EmpresaModule } from 'src/empresa/empresa.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    EmpresaUsuarioModule,
    EmpresaModule,
    UsuarioRoleModule,
  ],
  providers: [
    UsuarioService,
    EmpresaUsuarioService,
    EmpresaRepository,
    EmpresaUsuarioRepository,
  ],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule { }

