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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'erp',
      entities: [SetorEntity, ClienteEntity, ProjetoEntity],
      synchronize: true, // Sincronizar automaticamente o esquema (apenas para ambiente de desenvolvimento)
    }),
    SetorModule,
    ClienteModule,
    ProjetoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
