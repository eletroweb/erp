import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaModule } from '../empresa.module';
import { EmpresaUsuarioEntity } from './empresa.usuario.entity';
import { EmpresaUsuarioService } from './empresa.usuario.service';
import { EmpresaUsuarioRepository } from './empresa.usuario.repository';
import { EmpresaRepository } from '../empresa.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmpresaUsuarioEntity]),
        EmpresaModule,
    ],
    providers: [EmpresaUsuarioService, EmpresaUsuarioRepository, EmpresaRepository],
    controllers: [],
    exports: [EmpresaUsuarioService, TypeOrmModule],
})
export class EmpresaUsuarioModule { }
