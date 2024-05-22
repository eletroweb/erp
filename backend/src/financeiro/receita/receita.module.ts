import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaParcelaComprovanteService } from './parcela/receita.parcela.comprovante.service';
import { ReceitaParcelaController } from './parcela/receita.parcela.controller';
import { ReceitaParcelasEntity } from './parcela/receita.parcela.entity';
import { ReceitaParcelaRepository } from './parcela/receita.parcela.repository';
import { ReceitaParcelaService } from './parcela/receita.parcela.service';
import { ReceitaBusiness } from './receita.business';
import { ReceitaController } from './receita.controller';
import { ReceitaEntity } from './receita.entity';
import { ReceitaRepository } from './receita.repository';
import { ReceitaService } from './receita.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceitaEntity, ReceitaParcelasEntity])
  ],
  controllers: [ReceitaController, ReceitaParcelaController],
  providers: [
    ReceitaBusiness,
    ReceitaService, ReceitaParcelaService, ReceitaParcelaComprovanteService, ReceitaRepository, ReceitaParcelaRepository],
  exports: [ReceitaService],
})
export class ReceitaModule {}
