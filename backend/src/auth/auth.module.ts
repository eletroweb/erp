import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from '../usuario/usuario.service';
import { jwtConstants } from './constants';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { EmpresaEntity } from '../empresa/empresa.entity';
import { EmpresaUsuarioModule } from 'src/empresa/empresausuario/empresa.usuario.module';
import { UsuarioRoleModule } from 'src/usuario/roles/usuario.role.module';
import { UsuarioRoleEntity } from 'src/usuario/roles/usuario.roles.entity';
import { UsuarioLogadoMiddleware } from './middleware/usuario.logado.middleware';
import { EmpresaUsuarioService } from 'src/empresa/empresausuario/empresa.usuario.service';
import { EmpresaUsuarioRepository } from 'src/empresa/empresausuario/empresa.usuario.repository';
import { EmpresaRepository } from 'src/empresa/empresa.repository';

@Module({
  imports: [
    UsuarioModule,
    EmpresaUsuarioModule,
    UsuarioRoleModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UsuarioEntity, UsuarioRoleEntity, EmpresaEntity]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    UsuarioService,
    EmpresaUsuarioService,
    EmpresaUsuarioRepository,
    EmpresaRepository,
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
