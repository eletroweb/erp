import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetoEntity } from './projeto.entity';
import { ProjetoRepository } from './projeto.repository';
import { ProjetoController } from './projeto.controller';
import { ProjetoService } from './projeto.service';
import { SetorModule } from 'src/setores/setor.module';
import { ClienteModule } from 'src/clientes/cliente.module';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { ProjetoAtividadeController } from './atividades/projeto.atividade.controller';
import { ProjetoAtividadesEntity } from './atividades/projeto.atividade.entity';
import { ProjetoAtividadeService } from './atividades/projeto.atividade.service';
import { ProjetoAtividadeRepository } from './atividades/projeto.atividade.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjetoEntity, ProjetoAtividadesEntity]),
    SetorModule,
    ClienteModule,
    UsuarioModule,
  ],
  controllers: [ProjetoController, ProjetoAtividadeController],
  providers: [ProjetoService, ProjetoRepository, ProjetoAtividadeService, ProjetoAtividadeRepository],
  exports: [ProjetoService],
})
export class ProjetoModule {}
