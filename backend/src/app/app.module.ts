import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from '../setores/setor.module';
import { SetorEntity } from '../setores/setor.entity';

import { ClienteModule } from '../clientes/cliente.module';
import { ClienteEntity } from '../clientes/cliente.entity';
import { ProjetoEntity } from 'src/projetos/projeto.entity';
import { ProjetoModule } from 'src/projetos/projeto.module';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { AuthGuard, KeycloakConnectModule, ResourceGuard } from 'src/keycloak/src';
import { APP_GUARD } from '@nestjs/core';
import * as session from 'express-session';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/',
      realm: 'agilmax',
      clientId: 'erp-web',
      secret: '34bj1W9wNVBYQsP9bkaUxV6JwwVBosxb',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'erp',
      //entities: [SetorEntity, ClienteEntity, ProjetoEntity],
      autoLoadEntities: true,
      synchronize: true, // Sincronizar automaticamente o esquema (apenas para ambiente de desenvolvimento)
    }),
    SetorModule,
    ClienteModule,
    ProjetoModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
  ],
})
export class AppModule {}
