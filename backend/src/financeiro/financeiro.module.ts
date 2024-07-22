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
import { SetorModule } from 'src/setores/setor.module';
import { ContratoModule } from 'src/contratos/contrato.module';
import { FinanceiroAdapter } from './adapter/FinanceiroAdapter';
import { ScheduleModule } from '@nestjs/schedule';
import { InvoicePendingCron } from 'src/task/InvoicePendingCron';
import { EventGateway } from './events.gateway';
import { SocketService } from './socket.service';
import { FinanceiroParcelaAdapter } from './adapter/financeiro.parcela.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinanceiroEntity, FinanceiroParcelasEntity]),
    ScheduleModule.forRoot(),
    SetorModule,
    ContratoModule,
  ],
  controllers: [FinanceiroController, FinanceiroParcelaController],
  providers: [
    FinanceiroBusiness,
    FinanceiroSubscriber,
    FinanceiroService,
    FinanceiroParcelaService,
    FinanceiroParcelaComprovanteService,
    FinanceiroRepository,
    FinanceiroParcelaRepository,
    FinanceiroAdapter,
    FinanceiroParcelaAdapter,
    InvoicePendingCron,
    // TODO mover isso para um EventModule
    EventGateway,
    SocketService
  ],
  exports: [FinanceiroService, FinanceiroAdapter, FinanceiroParcelaAdapter, SocketService],
})
export class FinanceiroModule { }
