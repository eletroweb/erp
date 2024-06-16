/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './constants';
import { RoleModule } from './role/role.module';
import { UsuarioRoleEntity } from './usuarios/roles/usuario.roles.entity';
import { UsuarioEntity } from './usuarios/usuario.entity';
import { UsuarioRoleRepository } from './usuarios/roles/usuario.role.repository';
import { UsuarioRoleService } from './usuarios/roles/usuario.role.service';
import { UsuarioRepository } from './usuarios/usuario.repository';
import { UsuarioService } from './usuarios/usuario.service';
import { UsuarioController } from './usuarios/usuario.controller';

@Module({
  imports: [
    RoleModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UsuarioEntity, UsuarioRoleEntity]),
  ],
  controllers: [AuthController, UsuarioController],
  providers: [
    UsuarioService,
    UsuarioRoleService,
    UsuarioRepository,
    UsuarioRoleRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  exports: [AuthService, UsuarioService],
})
export class AuthModule {}
