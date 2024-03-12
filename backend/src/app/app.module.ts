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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      //entities: [SetorEntity, ClienteEntity, ProjetoEntity, ContatoEntity],
      autoLoadEntities: true,
      synchronize: true, // Sincronizar automaticamente o esquema (apenas para ambiente de desenvolvimento)
    }),
    SetorModule,
    ClienteModule,
    ProjetoModule,
    UsuarioModule,
    ContratoModule,
    ServicoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
