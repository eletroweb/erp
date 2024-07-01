import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRoleService } from './usuario.role.service';
import { UsuarioRoleEntity } from './usuario.roles.entity';
import { RoleModule } from 'src/auth/role/role.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsuarioRoleEntity]),
        RoleModule
    ],
    providers: [UsuarioRoleService],
    exports: [UsuarioRoleService],
})
export class UsuarioRoleModule { }
