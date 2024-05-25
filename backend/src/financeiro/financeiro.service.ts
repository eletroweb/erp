import { Injectable, NotFoundException } from '@nestjs/common';
import { FinanceiroRequestDto } from './financeiro.request.dto';
import { FinanceiroEntity } from './financeiro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceiroParcelasEntity } from './parcela/financeiro.parcela.entity';
import { FinanceiroParcelaSituacaoRequest } from './parcela/financeiro.parcela.situacao.request';
import { FinanceiroEnum } from 'src/enum/financeiro.enum';
import { FinanceiroParcelaService } from './parcela/financeiro.parcela.service';
import { FinanceiroBusiness } from './financeiro.business';

@Injectable()
export class FinanceiroService {

    constructor(
        @InjectRepository(FinanceiroEntity)
        private readonly financeiroRepository: Repository<FinanceiroEntity>,
        @InjectRepository(FinanceiroParcelasEntity)
        private readonly financeiroParcelaRepository: Repository<FinanceiroParcelasEntity>,
        private readonly financeiroParcelaService: FinanceiroParcelaService,
        private readonly financeiroBusiness: FinanceiroBusiness,
    ) { }

    // RF12.1 Listar financeiro
    async findAll(): Promise<FinanceiroEntity[]> {
        return this.financeiroRepository.find()
    }

    // RF12.2 Cadastrar financeiro
    async create(request: FinanceiroRequestDto): Promise<FinanceiroEntity> {
        const financeiroEntity = FinanceiroEntity.fromRequestDto(request);

        // RF12.6.1 Adicionar parcela a financeiro
        const financeiro = await this.financeiroParcelaService.adicionarParcelaNaFinanceiro(
            financeiroEntity,
            request.parcelas
        )
        return this.financeiroRepository.save(financeiro)
    }

    // RF12.4 Alterar financeiro
    async update(uuid: string, request: FinanceiroRequestDto): Promise<FinanceiroEntity> {
        const financeiroOrigin = await this.findOneByUuid(uuid);
        const financeiroTarget = FinanceiroEntity.fromRequestDto(request);
        const updatedFinanceiro = this.financeiroRepository.merge(financeiroOrigin, financeiroTarget);

        // RF12.6.1 Adicionar parcela a financeiro
        const financeiro = await this.financeiroParcelaService.adicionarParcelaNaFinanceiro(
            updatedFinanceiro,
            request.parcelas
        )

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
            relations: ['parcelas'],
        });

        if (!financeiro)
            throw new NotFoundException('Financeiro não localizada');

        const parcelasVencidas = await this.financeiroBusiness.parscelasVencidas(financeiro.parcelas)
        if ((parcelasVencidas).length > 0)
            await this.alterarSituacao(financeiro, parcelasVencidas, FinanceiroEnum.VENCIDA)

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
        const { situacao, financeiro_uuid, parcela } = request
        const financeiro = await this.findOneByUuid(financeiro_uuid);
        await this.financeiroParcelaRepository
            .createQueryBuilder()
            .update(FinanceiroParcelasEntity)
            .set({ situacao: situacao, comprovante })
            .where("financeiroId = :financeiroId", { financeiroId: financeiro.id })
            .andWhere("parcela = :parcela", { parcela: parcela })
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
                data_pagamento: new Date()
            })
            .where("uuid = :uuid", { uuid })
            .execute();
    }

    async alterarSituacao(
        financeiro: FinanceiroEntity,
        parcelas: FinanceiroParcelasEntity[],
        situacao: FinanceiroEnum
    ) {
        financeiro.situacao = situacao
        this.financeiroRepository.save(financeiro)
        parcelas.forEach(parcela => {
            parcela.situacao = situacao
            this.financeiroParcelaRepository.save(parcela)
        })
    }
}
