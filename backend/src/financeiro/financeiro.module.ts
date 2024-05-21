import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespesaService } from './despesas/despesa.service';
import { DespesaController } from './despesas/despesa.controller';
import { DespesaEntity } from './despesas/despesa.entity';
import { DespesaRepository } from './despesas/despesa.repository';
import { DespesaParcelaRepository } from './despesas/parcela/despesa.parcela.repository';
import { DespesaParcelasEntity } from './despesas/parcela/despesa.parcela.entity';
import { DespesaParcelaController } from './despesas/parcela/despesa.parcela.controller';
import { DespesaParcelaComprovanteService } from './despesas/parcela/despesa.parcela.comprovante.service';
import { DespesaParcelaService } from './despesas/parcela/despesa.parcela.service';
import { DespesaBusiness } from './despesas/despesa.business';

@Module({
  imports: [
    TypeOrmModule.forFeature([DespesaEntity, DespesaParcelasEntity])
  ],
  controllers: [DespesaController, DespesaParcelaController],
  providers: [
    DespesaBusiness,
    DespesaService, DespesaParcelaService, DespesaParcelaComprovanteService, DespesaRepository, DespesaParcelaRepository],
  exports: [DespesaService],
})
export class FinanceiroModule {}
