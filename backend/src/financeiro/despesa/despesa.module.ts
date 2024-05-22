import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespesaBusiness } from './despesa.business';
import { DespesaController } from './despesa.controller';
import { DespesaEntity } from './despesa.entity';
import { DespesaRepository } from './despesa.repository';
import { DespesaService } from './despesa.service';
import { DespesaParcelaComprovanteService } from './parcela/despesa.parcela.comprovante.service';
import { DespesaParcelaController } from './parcela/despesa.parcela.controller';
import { DespesaParcelasEntity } from './parcela/despesa.parcela.entity';
import { DespesaParcelaRepository } from './parcela/despesa.parcela.repository';
import { DespesaParcelaService } from './parcela/despesa.parcela.service';

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
export class DespesaModule {}
