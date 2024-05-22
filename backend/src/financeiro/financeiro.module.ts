import { Module } from '@nestjs/common';
import { DespesaModule } from './despesa/despesa.module';
import { ReceitaModule } from './receita/receita.module';

@Module({
  imports: [
    DespesaModule,
    ReceitaModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class FinanceiroModule {}
