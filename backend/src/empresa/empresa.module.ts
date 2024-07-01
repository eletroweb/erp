import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaService } from './empresa.service';
import { EmpresaEntity } from './empresa.entity';
import { EmpresaController } from './empresa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaEntity])],
  providers: [EmpresaService],
  controllers: [EmpresaController],
  exports: [EmpresaService, TypeOrmModule],
})
export class EmpresaModule { }
