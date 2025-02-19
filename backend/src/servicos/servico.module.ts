import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoEntity } from './servico.entity';
import { ServicoRepository } from './servico.repository';
import { ServicoController } from './servico.controller';
import { ServicoService } from './servico.service';
import { SetorModule } from 'src/setores/setor.module';
import { ContratoModule } from 'src/contratos/contrato.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicoEntity]),
    SetorModule,
    ContratoModule,
  ],
  controllers: [ServicoController],
  providers: [ServicoService, ServicoRepository],
  exports: [ServicoService],
})
export class ServicoModule {}
