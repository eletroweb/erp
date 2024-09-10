import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracaoController } from './configuracao.controller';
import { ConfiguracaoService } from './configuracao.service';
import { ConfiguracaoEntity } from './configuracao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfiguracaoEntity])],
  controllers: [ConfiguracaoController],
  providers: [ConfiguracaoService],
})
export class ConfiguracaoModule {}
