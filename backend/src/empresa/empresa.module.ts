import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaService } from './empresa.service';
import { EmpresaService } from './empresa.service';
import { EmpresaEntity } from './empresa.entity';
import { EmpresaController } from './empresa.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { EmpresaUsuarioModule } from './empresausuario/empresa.usuario.module';
import { EmpresaUsuarioRepository } from './empresausuario/empresa.usuario.repository';

@Module({
    imports: [TypeOrmModule.forFeature([EmpresaEntity]),
        forwardRef(() => UsuarioModule),
        forwardRef(() => EmpresaUsuarioModule),
    ],
  providers: [EmpresaService, EmpresaUsuarioRepository],
  controllers: [EmpresaController],
  exports: [EmpresaService, TypeOrmModule],
  exports: [EmpresaService, TypeOrmModule],
})
export class EmpresaModule { }
export class EmpresaModule { }
