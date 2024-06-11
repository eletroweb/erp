import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetoEntity } from './projeto.entity';
import { ProjetoRepository } from './projeto.repository';
import { ProjetoController } from './projeto.controller';
import { ProjetoService } from './projeto.service';
import { SetorModule } from 'src/setores/setor.module';
import { ClienteModule } from 'src/clientes/cliente.module';
import { ProjetoAtividadeService } from './atividade/projeto.atividade.service';
import { ProjetoAtividadeRepository } from './atividade/projeto.atividade.repository';
import { ProjetoAtividadeController } from './atividade/projeto.atividade.controller';
import { ProjetoAtividadesEntity } from './atividade/projeto.atividade.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjetoEntity, ProjetoAtividadesEntity]),
    SetorModule,
    ClienteModule,
    AuthModule,
  ],
  controllers: [ProjetoController, ProjetoAtividadeController],
  providers: [
    ProjetoService,
    ProjetoAtividadeService,
    ProjetoRepository,
    ProjetoAtividadeRepository
  ],
  exports: [ProjetoService, ProjetoAtividadeService],
})
export class ProjetoModule { }
