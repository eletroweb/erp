import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { ClienteRepository } from './cliente.repository';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { SetorModule } from 'src/setores/setor.module';
import { ClienteDocumentoValidation } from './validator/cliente.documento.validator';
import { ClienteEmailValidation } from './validator/cliente.email.validator';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity]), SetorModule],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ClienteRepository,
    ClienteEmailValidation,
    ClienteDocumentoValidation,
  ],
  exports: [ClienteService],
})
export class ClienteModule {}
