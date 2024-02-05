import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from '../setores/setor.module';
import { SetorEntity } from '../setores/setor.entity';

import { ClienteModule } from '../clientes/cliente.module';
import { ClienteEntity } from '../clientes/cliente.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Configuração do TypeORM para a conexão com o MySQL
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'erp',
      entities: [SetorEntity, ClienteEntity],
      synchronize: true, // Sincronizar automaticamente o esquema (apenas para ambiente de desenvolvimento)
    }),
    SetorModule,
    ClienteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
