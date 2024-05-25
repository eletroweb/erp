import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceiroBusiness } from './financeiro.business';
import { FinanceiroController } from './financeiro.controller';
import { FinanceiroEntity } from './financeiro.entity';
import { FinanceiroRepository } from './financeiro.repository';
import { FinanceiroService } from './financeiro.service';
import { FinanceiroSubscriber } from './financeiro.subscriber';
import { FinanceiroParcelaComprovanteService } from './parcela/financeiro.parcela.comprovante.service';
import { FinanceiroParcelaController } from './parcela/financeiro.parcela.controller';
import { FinanceiroParcelasEntity } from './parcela/financeiro.parcela.entity';
import { FinanceiroParcelaRepository } from './parcela/financeiro.parcela.repository';
import { FinanceiroParcelaService } from './parcela/financeiro.parcela.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinanceiroEntity, FinanceiroParcelasEntity])
  ],
  controllers: [FinanceiroController, FinanceiroParcelaController],
  providers: [
    FinanceiroBusiness,
    FinanceiroSubscriber,
    FinanceiroService, FinanceiroParcelaService, FinanceiroParcelaComprovanteService, FinanceiroRepository, FinanceiroParcelaRepository],
  exports: [FinanceiroService],
})
export class FinanceiroModule {}
