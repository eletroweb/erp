import { Injectable, Logger } from '@nestjs/common';
import { FinanceiroParcelasEntity } from './financeiro.parcela.entity';
import { FinanceiroEnum } from 'src/enum/financeiro.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceiroParcelaRequest } from './financeiro.parcela.request';
import { FinanceiroEntity } from '../financeiro.entity';
import { FinanceiroParcelaAdapter } from '../adapter/financeiro.parcela.adapter';

@Injectable()
export class FinanceiroParcelaService {

  private readonly logger: Logger = new Logger('FinanceiroParcelaService');

  constructor(
    @InjectRepository(FinanceiroParcelasEntity)
    private readonly financeiroParcelaRepository: Repository<FinanceiroParcelasEntity>,
    private readonly financeiroParcelaAdapter: FinanceiroParcelaAdapter
  ) { }

  async todasParcelasPagas(
    parcelas: FinanceiroParcelasEntity[],
  ): Promise<boolean> {
    return parcelas.every(
      (parcela) => parcela.situacao === FinanceiroEnum.PAGA,
    );
  }

  async adicionarParcelaNaFinanceiro(
    financeiro: FinanceiroEntity,
    parcelas: FinanceiroParcelaRequest[],
  ): Promise<FinanceiroEntity> {

    try {
      const requestParcelIds = parcelas.map((parcela) => parcela.parcela);
      await this.financeiroParcelaRepository
        .createQueryBuilder()
        .delete()
        .where(
          'financeiroId = :financeiroId AND parcela NOT IN (:...requestParcelIds)',
          { financeiroId: financeiro.id, requestParcelIds: requestParcelIds },
        )
        .orWhere('financeiroId = :financeiroId', { financeiroId: financeiro.id })
        .execute();

      const newParcelas = parcelas.map((financeiro) =>
        this.financeiroParcelaAdapter.toEntity(financeiro),
      );
      financeiro.parcelas = newParcelas;

      await this.financeiroParcelaRepository
        .createQueryBuilder()
        .delete()
        .from(FinanceiroParcelasEntity)
        .where('financeiroId = :financeiroId', { financeiroId: financeiro.id })
        .execute();

      return financeiro;
    } catch (error) {
      this.logger.error(`[FinanceiroParcelaService.adicionarParcelaNaFinanceiro] ${error}`);
    }
  }
}
