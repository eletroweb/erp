/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { EmpresaEntity } from 'src/empresa/empresa.entity';
import { UsuarioLogadoMiddleware } from './middleware/usuario.logado.middleware';

@Module({
  imports: [
    RoleModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UsuarioEntity, UsuarioRoleEntity, EmpresaEntity]),
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
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsuarioLogadoMiddleware)
      .forRoutes({ path: 'empresa/logomarca', method: RequestMethod.PUT });
  }
}
