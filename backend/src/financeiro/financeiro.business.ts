import { Injectable } from '@nestjs/common';
import { FinanceiroParcelasEntity } from './parcela/financeiro.parcela.entity';
import {
  FinanceiroCategoriaEnum,
  FinanceiroCentroDeCustoEnum,
  FinanceiroEnum,
} from 'src/enum/financeiro.enum';
import { FinanceiroRequestDto } from './financeiro.request.dto';
const dayjs = require('dayjs');

@Injectable()
export class FinanceiroBusiness {
  async vencida(parcelas: FinanceiroParcelasEntity[]): Promise<boolean> {
    if (parcelas != undefined) {
      return parcelas.some((parcela) => {
        return (
          dayjs(parcela.data_vencimento)
            .startOf('day')
            .isBefore(dayjs().startOf('day')) &&
          [FinanceiroEnum.PENDENTE].includes(parcela.situacao)
        );
      });
    }
    return false;
  }

  async parscelasVencidas(
    parcelas: FinanceiroParcelasEntity[],
  ): Promise<FinanceiroParcelasEntity[]> {
    if (parcelas != undefined) {
      return parcelas.filter((parcela) => {
        return (
          dayjs(parcela.data_vencimento)
            .startOf('day')
            .isBefore(dayjs().startOf('day')) &&
          [FinanceiroEnum.PENDENTE].includes(parcela.situacao)
        );
      });
    }
    return [];
  }

  limparSetor(request: FinanceiroRequestDto): boolean {
    return (
      request.centro_custo !== FinanceiroCentroDeCustoEnum.SETOR ||
      request.categoria !== FinanceiroCategoriaEnum.DESPESA
    );
  }

  limparContrato(request: FinanceiroRequestDto): boolean {
    return (
      request.centro_custo !== FinanceiroCentroDeCustoEnum.CONTRATO ||
      request.categoria !== FinanceiroCategoriaEnum.DESPESA
    );
  }
}
