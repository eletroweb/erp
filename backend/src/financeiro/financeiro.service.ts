import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FinanceiroRequestDto } from './financeiro.request.dto';
import { FinanceiroEntity } from './financeiro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceiroParcelasEntity } from './parcela/financeiro.parcela.entity';
import { FinanceiroParcelaSituacaoRequest } from './parcela/financeiro.parcela.situacao.request';
import {
  FinanceiroEnum,
  FinanceiroCategoriaEnum,
  FinanceiroCentroDeCustoEnum,
} from 'src/enum/financeiro.enum';
import { FinanceiroParcelaService } from './parcela/financeiro.parcela.service';
import { FinanceiroBusiness } from './financeiro.business';
import { SetorService } from 'src/setores/setor.service';
import { ContratoService } from 'src/contratos/contrato.service';
import { CategoriaSpecification } from './specification/CategoriaSpecification';
import { DataPagamentoSpecification } from './specification/DataPagamentoSpecification ';
import { DataVencimentoSpecification } from './specification/DataVencimentoSpecification';
import { DescricaoSpecification } from './specification/DescricaoSpecification';
import { ParceladaSpecification } from './specification/ParceladaSpecification';
import { SituacaoSpecification } from './specification/SituacaoSpecification';
import { Specification } from './specification/Specification';
import { UsuarioLogado } from 'src/usuario/dto/usuario.response.dto';
import { EmpresaUsuarioService } from 'src/empresa/empresausuario/empresa.usuario.service';
import { EmpresaSpecification } from 'src/setores/specification/EmpresaSpecification';
import { FinanceiroAdapter } from './adapter/FinanceiroAdapter';

const dayjs = require('dayjs');

@Injectable()
export class FinanceiroService {
  constructor(
    @Inject(EmpresaUsuarioService) private empresaUsuarioService: EmpresaUsuarioService,
    @InjectRepository(FinanceiroEntity)
    private readonly financeiroRepository: Repository<FinanceiroEntity>,
    @InjectRepository(FinanceiroParcelasEntity)
    private readonly financeiroParcelaRepository: Repository<FinanceiroParcelasEntity>,
    private readonly financeiroParcelaService: FinanceiroParcelaService,
    private readonly financeiroBusiness: FinanceiroBusiness,
    private readonly setorService: SetorService,
    private readonly contratoService: ContratoService,
    private readonly financeiroAdapter: FinanceiroAdapter
  ) { }

  // RF12.1 Listar financeiro
  async findAll(
    usuarioLogado: UsuarioLogado,
    descricao: string,
    categoria: FinanceiroCategoriaEnum,
    dataInicio: string,
    dataFim: string,
    dataPagamentoInicio: string,
    dataPagamentoFim: string,
    situacao: string,
    parcelada: boolean,
  ): Promise<FinanceiroEntity[]> {
    const consulta = this.financeiroRepository.createQueryBuilder('financeiro');
    const specifications: Specification<FinanceiroEntity>[] = [];

    if (descricao) specifications.push(new DescricaoSpecification(descricao));

    if (categoria) specifications.push(new CategoriaSpecification(categoria));

    if (dataInicio || dataFim)
      specifications.push(new DataVencimentoSpecification(dataInicio, dataFim));

    if (dataPagamentoInicio || dataPagamentoFim) {
      specifications.push(
        new DataPagamentoSpecification(dataPagamentoInicio, dataPagamentoFim),
      );
    }
    if (situacao) specifications.push(new SituacaoSpecification(situacao));

    if (parcelada !== null)
      specifications.push(new ParceladaSpecification(parcelada));

    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    new EmpresaSpecification(empresa).apply(consulta);

    for (const specification of specifications) {
      specification.apply(consulta);
    }

    return consulta.getMany();
  }

  // RF12.2 Cadastrar financeiro
  async create(usuarioLogado: UsuarioLogado, request: FinanceiroRequestDto): Promise<FinanceiroEntity> {
    const setor = await this.setorService.findOneByUuid(request.setor.uuid)
    const contrato = await this.contratoService.findOneByUuid(request.contrato.uuid)
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

    const empresa = await this.empresaUsuarioService.findAllByUsuarioLogado(usuarioLogado.sub);
    financeiro.empresa = empresa;
    if (request.centro_custo === FinanceiroCentroDeCustoEnum.SETOR) {
      financeiro.contrato = null;
    } else {
      financeiro.setor = null;
    }
    return this.financeiroRepository.save(financeiro);
  }

  // RF12.4 Alterar financeiro
  async update(
    uuid: string,
    request: FinanceiroRequestDto,
  ): Promise<FinanceiroEntity> {
    const financeiroOrigin = await this.findOneByUuid(uuid);
    const { setor: { uuid: setorUuid } = {}, contrato: { uuid: contratoUuid } = {} } = request;

    const [setor, contrato] = await Promise.all([
      setorUuid ? this.setorService.findOneByUuid(setorUuid) : Promise.resolve(null),
      contratoUuid ? this.contratoService.findOneByUuid(contratoUuid) : Promise.resolve(null)
    ]);

    const financeiroTarget = this.financeiroAdapter.toEntity(request, setor, contrato);
    const updatedFinanceiro = this.financeiroRepository.merge(
      financeiroOrigin,
      financeiroTarget,
    );

    // RF12.6.1 Adicionar parcela a financeiro
    const financeiro =
      await this.financeiroParcelaService.adicionarParcelaNaFinanceiro(
        updatedFinanceiro,
        request.parcelas,
      );

    if (request.centro_custo === FinanceiroCentroDeCustoEnum.SETOR) {
      financeiro.contrato = null;
    } else {
      financeiro.setor = null;
    }

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


    if (!dataInicio || !dataFim) {
      const currentDate = dayjs();
      dataInicio = currentDate.startOf('month').format('YYYY-MM-DD');
      dataFim = currentDate.endOf('month').format('YYYY-MM-DD');
    }

    const resumoQuery = this.financeiroRepository
      .createQueryBuilder('financeiro')
      .select('SUM(CASE WHEN financeiro.categoria = :receitaCategoria THEN financeiro.valor_cobranca ELSE 0 END)', 'receita')
      .addSelect('SUM(CASE WHEN financeiro.categoria = :despesaCategoria THEN financeiro.valor_cobranca ELSE 0 END)', 'despesa')
      /*.where('financeiro.data_vencimento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      })*/
      .setParameters({
        receitaCategoria: FinanceiroCategoriaEnum.RECEITA,
        despesaCategoria: FinanceiroCategoriaEnum.DESPESA,
      });

    if (situacao) {
      resumoQuery.andWhere('financeiro.situacao = :situacao', { situacao });
    }

    const resumoResult = await resumoQuery.getRawOne();

    const receita = resumoResult?.receita || 0;
    const despesa = resumoResult?.despesa || 0;

    return {
      total_receita: parseFloat(receita),
      total_despesa: parseFloat(despesa),
      data_inicio: dataInicio,
      data_fim: dataFim,
    };
  }
}
