import { Injectable, NotFoundException } from '@nestjs/common';
import { FinanceiroRequestDto } from './financeiro.request.dto';
import { FinanceiroEntity } from './financeiro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceiroParcelasEntity } from './parcela/financeiro.parcela.entity';
import { FinanceiroParcelaSituacaoRequest } from './parcela/financeiro.parcela.situacao.request';
import {
  FinanceiroEnum,
  FinanceiroCategoriaEnum,
} from 'src/enum/financeiro.enum';
import { FinanceiroParcelaService } from './parcela/financeiro.parcela.service';
import { FinanceiroBusiness } from './financeiro.business';
import { SetorService } from 'src/setores/setor.service';
import { ContratoService } from 'src/contratos/contrato.service';

const dayjs = require('dayjs');

@Injectable()
export class FinanceiroService {
  constructor(
    @InjectRepository(FinanceiroEntity)
    private readonly financeiroRepository: Repository<FinanceiroEntity>,
    @InjectRepository(FinanceiroParcelasEntity)
    private readonly financeiroParcelaRepository: Repository<FinanceiroParcelasEntity>,
    private readonly financeiroParcelaService: FinanceiroParcelaService,
    private readonly financeiroBusiness: FinanceiroBusiness,
    private readonly setorService: SetorService,
    private readonly contratoService: ContratoService,
  ) { }

  // RF12.1 Listar financeiro
  async findAll(
    descricao: string,
    categoria: FinanceiroCategoriaEnum,
    dataInicio: string,
    dataFim: string,
    dataPagamentoInicio,
    dataPagamentoFim,
    situacao,
    parcelada,
  ): Promise<FinanceiroEntity[]> {
    const consulta = this.financeiroRepository.createQueryBuilder('financeiro');

    if (descricao) {
      consulta.andWhere('financeiro.descricao LIKE :descricao', {
        descricao: `%${descricao}%`,
      });
    }
    if (categoria) {
      consulta.andWhere('financeiro.categoria = :categoria', {
        categoria: categoria,
      });
    }
    if (dataInicio && dataFim) {
      consulta.andWhere(
        'financeiro.data_vencimento BETWEEN :dataInicio AND :dataFim',
        {
          dataInicio: dataInicio,
          dataFim: dataFim,
        },
      );
    } else if (dataInicio) {
      consulta.andWhere('financeiro.data_vencimento >= :dataInicio', {
        dataInicio,
      });
    } else if (dataFim) {
      consulta.andWhere('financeiro.data_vencimento <= :dataFim', { dataFim });
    }
    if (dataPagamentoInicio && dataPagamentoFim) {
      consulta.andWhere(
        'DATE(financeiro.data_pagamento) BETWEEN :dataPagamentoInicio AND :dataPagamentoFim',
        {
          dataPagamentoInicio,
          dataPagamentoFim,
        },
      );
    } else if (dataPagamentoInicio) {
      consulta.andWhere(
        'DATE(DATE(financeiro.data_pagamento)) >= :dataPagamentoInicio',
        {
          dataPagamentoInicio,
        },
      );
    } else if (dataPagamentoFim) {
      consulta.andWhere(
        'DATE(financeiro.data_pagamento) <= :dataPagamentoFim',
        {
          dataPagamentoFim,
        },
      );
    }
    if (situacao) {
      consulta.andWhere('financeiro.situacao = :situacao', {
        situacao: situacao,
      });
    }
    if (parcelada !== null) {
      consulta.andWhere('financeiro.parcelada = :parcelada', {
        parcelada: parcelada,
      });
    }
    return consulta.getMany();
  }

  // RF12.2 Cadastrar financeiro
  async create(request: FinanceiroRequestDto): Promise<FinanceiroEntity> {
    const setorUuid = request.setor?.uuid;
    const contratoUuid = request.contrato?.uuid;

    const setorPromise = setorUuid
      ? this.setorService.findOneByUuid(setorUuid)
      : Promise.resolve(null);
    const contratoPromise = contratoUuid
      ? this.contratoService.findOneByUuid(contratoUuid)
      : Promise.resolve(null);

    const [setor, contrato] = await Promise.all([
      setorPromise,
      contratoPromise,
    ]);

    const financeiroEntity = FinanceiroEntity.fromRequestDto(
      request,
      setor,
      contrato,
    );

    // RF12.6.1 Adicionar parcela a financeiro
    const financeiro =
      await this.financeiroParcelaService.adicionarParcelaNaFinanceiro(
        financeiroEntity,
        request.parcelas,
      );
    return this.financeiroRepository.save(financeiro);
  }

  // RF12.4 Alterar financeiro
  async update(
    uuid: string,
    request: FinanceiroRequestDto,
  ): Promise<FinanceiroEntity> {
    const financeiroOriginPromise = this.findOneByUuid(uuid);
    const setorUuid = request.setor?.uuid;
    const contratoUuid = request.contrato?.uuid;

    const setorPromise = setorUuid
      ? this.setorService.findOneByUuid(setorUuid)
      : Promise.resolve(null);
    const contratoPromise = contratoUuid
      ? this.contratoService.findOneByUuid(contratoUuid)
      : Promise.resolve(null);

    const [financeiroOrigin, setor, contrato] = await Promise.all([
      financeiroOriginPromise,
      setorPromise,
      contratoPromise,
    ]);

    const financeiroTarget = FinanceiroEntity.fromRequestDto(
      request,
      setor,
      contrato,
    );
    const updatedFinanceiro = this.financeiroRepository.merge(
      financeiroOrigin,
      financeiroTarget,
    );

    if (this.financeiroBusiness.limparSetor(request))
      updatedFinanceiro.setor = null;

    if (this.financeiroBusiness.limparContrato(request))
      updatedFinanceiro.contrato = null;

    // RF12.6.1 Adicionar parcela a financeiro
    const financeiro =
      await this.financeiroParcelaService.adicionarParcelaNaFinanceiro(
        updatedFinanceiro,
        request.parcelas,
      );

    await this.financeiroRepository.save(financeiro);
    return financeiro;
  }

  /* 
    RF12.3 Excluir financeiro
    RF12.4 Alterar financeiro
    RF12.5.1 Realizar pagamento de parcela
    RF12.5.2 Anexar comprovante de pagamento na parcela
    */
  async findOneByUuid(uuid: string): Promise<FinanceiroEntity> {
    const financeiro = await this.financeiroRepository.findOne({
      where: { uuid },
      relations: ['parcelas', 'setor', 'contrato'],
    });

    if (!financeiro) throw new NotFoundException('Financeiro não localizada');

    const parcelasVencidas = await this.financeiroBusiness.parscelasVencidas(
      financeiro.parcelas,
    );
    if (parcelasVencidas.length > 0)
      await this.alterarSituacao(
        financeiro,
        parcelasVencidas,
        FinanceiroEnum.VENCIDA,
      );

    return financeiro;
  }

  // RF12.3 Excluir financeiro
  async remove(uuid: string): Promise<FinanceiroEntity | null> {
    const financeiro = await this.findOneByUuid(uuid);
    if (!financeiro) return null;

    for (const parcela of financeiro.parcelas) {
      await this.financeiroParcelaRepository.delete(parcela.id);
    }
    return this.financeiroRepository.remove(financeiro);
  }

  // RF12.5.1 Realizar pagamento de parcela
  // RF12.5.2 Anexar comprovante de pagamento na parcela
  async pagar(request: FinanceiroParcelaSituacaoRequest, comprovante: string) {
    const { situacao, financeiro_uuid, parcela, observacao } = request;
    const financeiro = await this.findOneByUuid(financeiro_uuid);
    const data_pagamento = dayjs(request.data_pagamento, 'DD/MM/YYYY').toDate();

    await this.financeiroParcelaRepository
      .createQueryBuilder()
      .update(FinanceiroParcelasEntity)
      .set({ situacao: situacao, comprovante, data_pagamento, observacao })
      .where('financeiroId = :financeiroId', { financeiroId: financeiro.id })
      .andWhere('parcela = :parcela', { parcela: parcela })
      .execute();
  }

  /* 
    RF12.5.2 Anexar comprovante de pagamento na parcela
    RF12.4.2.1 Salvar a data de pagamento ao ralizar o pagamento integral da financeiro
    */
  async pagarFinanceiro(uuid: string) {
    await this.financeiroRepository
      .createQueryBuilder()
      .update(FinanceiroEntity)
      .set({
        situacao: FinanceiroEnum.PAGA,
        data_pagamento: new Date(),
      })
      .where('uuid = :uuid', { uuid })
      .execute();
  }

  async alterarSituacao(
    financeiro: FinanceiroEntity,
    parcelas: FinanceiroParcelasEntity[],
    situacao: FinanceiroEnum,
  ) {
    financeiro.situacao = situacao;
    this.financeiroRepository.save(financeiro);
    parcelas.forEach((parcela) => {
      parcela.situacao = situacao;
      this.financeiroParcelaRepository.save(parcela);
    });
  }

  async getResumo(
    dataInicio: string,
    dataFim: string,
    situacao?: FinanceiroEnum,
  ): Promise<any> {
    const queryDespesas = this.financeiroRepository
      .createQueryBuilder('financeiro')
      .select('SUM(financeiro.valor_cobranca)', 'totalDespesa')
      .where('financeiro.categoria = :categoria', {
        categoria: FinanceiroCategoriaEnum.DESPESA,
      })
      .andWhere('financeiro.data_vencimento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      });

    const queryReceitas = this.financeiroRepository
      .createQueryBuilder('financeiro')
      .select('SUM(financeiro.valor_cobranca)', 'totalReceita')
      .where('financeiro.categoria = :categoria', {
        categoria: FinanceiroCategoriaEnum.RECEITA,
      })
      .andWhere('financeiro.data_vencimento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      });

    if (situacao) {
      queryDespesas.andWhere('financeiro.situacao = :situacao', { situacao });
      queryReceitas.andWhere('financeiro.situacao = :situacao', { situacao });
    }

    const totalDespesaResult = await queryDespesas.getRawOne();
    const totalReceitaResult = await queryReceitas.getRawOne();

    const totalDespesa = totalDespesaResult?.totalDespesa || 0;
    const totalReceita = totalReceitaResult?.totalReceita || 0;

    return {
      total_despesa: parseFloat(totalDespesa),
      total_receita: parseFloat(totalReceita),
      data_inicio: dataInicio,
      data_fim: dataFim,
    };
  }
}
