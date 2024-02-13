import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from '../setores/setor.module';

import { ClienteModule } from '../clientes/cliente.module';
import { ProjetoModule } from 'src/projetos/projeto.module';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { ContratoModule } from 'src/contratos/contrato.module';
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
    UsuarioModule,
    ContratoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
