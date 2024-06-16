import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FornecedorEntity } from './fornecedor.entity';
import { FornecedorRepository } from './fornecedor.repository';
import { FornecedorController } from './fornecedor.controller';
import { FornecedorService } from './fornecedor.service';

@Module({
  imports: [TypeOrmModule.forFeature([FornecedorEntity])],
  controllers: [FornecedorController],
  providers: [FornecedorService, FornecedorRepository],
  exports: [FornecedorService],
})
export class FornecedorModule {}
