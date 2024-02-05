import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetoEntity } from './projeto.entity';
import { ProjetoRepository } from './projeto.repository';
import { ProjetoController } from './projeto.controller';
import { ProjetoService } from './projeto.service';
import { SetorModule } from 'src/setores/setor.module';
import { ClienteModule } from 'src/clientes/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjetoEntity]),
    SetorModule,
    ClienteModule,
  ],
  controllers: [ProjetoController],
  providers: [ProjetoService, ProjetoRepository],
  exports: [ProjetoService],
})
export class ProjetoModule {}
