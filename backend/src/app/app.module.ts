import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from '../setores/setor.module';

import { ClienteModule } from '../clientes/cliente.module';
import { ProjetoModule } from 'src/projetos/projeto.module';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { AuthGuard, ResourceGuard } from 'src/keycloak/src';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
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
