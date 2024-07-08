import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetorEntity } from './setor.entity';
import { SetorRepository } from './setor.repository';
import { SetorController } from './setor.controller';
import { SetorService } from './setor.service';

@Module({
  imports: [TypeOrmModule.forFeature([SetorEntity])],
  controllers: [SetorController],
  providers: [SetorService, SetorRepository],
  exports: [SetorService],
})
export class SetorModule {}
