import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoEntity } from './contrato.entity';
import { ContratoRepository } from './contrato.repository';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';
import { SetorModule } from 'src/setores/setor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContratoEntity]),
    SetorModule
  ],
  controllers: [ContratoController],
  providers: [ContratoService, ContratoRepository],
  exports: [ContratoService],
})
export class ContratoModule {}