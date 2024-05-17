import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from '../setores/setor.module';

import { ClienteModule } from '../clientes/cliente.module';
import { ProjetoModule } from 'src/projetos/projeto.module';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { ContratoModule } from 'src/contratos/contrato.module';
import { ServicoModule } from 'src/servicos/servico.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, ResourceGuard } from 'src/keycloak/src';
import { OrdemServicoModule } from 'src/ordemServicos/ordemServico.module';
import { ColaboradorModule } from 'src/recursosHumanos/colaborador.module';
import { FornecedorModule } from 'src/fornecedores/fornecedor.module';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const keycloakConfig = configService.get('keycloak');
        return { ...keycloakConfig };
      },
      inject: [ConfigService],
      useClass: undefined
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return { ...dbConfig };
      },
      inject: [ConfigService],
    }),
    SetorModule,
    ClienteModule,
    ProjetoModule,
    UsuarioModule,
    ContratoModule,
    ServicoModule,
    OrdemServicoModule,
    ColaboradorModule,
    FornecedorModule
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
export class AppModule { }
