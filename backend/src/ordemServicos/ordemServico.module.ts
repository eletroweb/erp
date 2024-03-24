import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemServicoEntity } from './ordemServico.entity';
import { OrdemServicoRepository } from './ordemServico.Repository';
import { OrdemServicoController } from './ordemServico.controller';
import { OrdemServicoService } from './ordemServico.service';
import { SetorModule } from 'src/setores/setor.module';
import { ClienteModule } from 'src/clientes/cliente.module';
import { ServicoModule } from 'src/servicos/servico.module';
import { OssEntity } from './oss.entity';
import { OssService } from './oss.service';
import { OssRepository } from './oss.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([OrdemServicoEntity, OssEntity]),
    SetorModule,
    ClienteModule,
    ServicoModule
  ],
  controllers: [OrdemServicoController],
  providers: [OrdemServicoService, OrdemServicoRepository, OssService, OssRepository],
  exports: [OrdemServicoService, OssService],
})
export class OrdemServicoModule {}
