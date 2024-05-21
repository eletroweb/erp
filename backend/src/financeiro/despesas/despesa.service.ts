import { Injectable, NotFoundException } from '@nestjs/common';
import { DespesaRequestDto } from './despesa.request.dto';
import { DespesaEntity } from './despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DespesaParcelasEntity } from './parcela/despesa.parcela.entity';
import { DespesaParcelaSituacaoRequest } from './parcela/despesa.parcela.situacao.request';
import { FinanceiroEnum } from 'src/enum/financeiro.enum';
import { DespesaParcelaService } from './parcela/despesa.parcela.service';
import { DespesaBusiness } from './despesa.business';

@Injectable()
export class DespesaService {

    constructor(
        @InjectRepository(DespesaEntity)
        private readonly despesaRepository: Repository<DespesaEntity>,
        @InjectRepository(DespesaParcelasEntity)
        private readonly despesaParcelaRepository: Repository<DespesaParcelasEntity>,
        private readonly despesaParcelaService: DespesaParcelaService,
        private readonly despesaBusiness: DespesaBusiness,
    ) { }

    // RF12.1 Listar despesas
    async findAll(): Promise<DespesaEntity[]> {
        return this.despesaRepository.find()
    }

    // RF12.2 Cadastrar despesa
    async create(request: DespesaRequestDto): Promise<DespesaEntity> {
        const despesaEntity = DespesaEntity.fromRequestDto(request);

        // RF12.6.1 Adicionar parcela a despesa
        const despesa = await this.despesaParcelaService.adicionarParcelaNaDespesa(
            despesaEntity,
            request.parcelas
        )
        return this.despesaRepository.save(despesa)
    }

    // RF12.4 Alterar despesa
    async update(uuid: string, request: DespesaRequestDto): Promise<DespesaEntity> {
        const despesaOrigin = await this.findOneByUuid(uuid);
        const despesaTarget = DespesaEntity.fromRequestDto(request);
        const updatedDespesa = this.despesaRepository.merge(despesaOrigin, despesaTarget);

        // RF12.6.1 Adicionar parcela a despesa
        const despesa = await this.despesaParcelaService.adicionarParcelaNaDespesa(
            updatedDespesa,
            request.parcelas
        )

        await this.despesaRepository.save(despesa);
        return despesa;
    }

    /* 
    RF12.3 Excluir despesa
    RF12.4 Alterar despesa
    RF12.5.1 Realizar pagamento de parcela
    RF12.5.2 Anexar comprovante de pagamento na parcela
    */
    async findOneByUuid(uuid: string): Promise<DespesaEntity> {
        const despesa = await this.despesaRepository.findOne({
            where: { uuid },
            relations: ['parcelas'],
        });

        if (!despesa)
            throw new NotFoundException('Despesa não localizada');

        const parcelasVencidas = await this.despesaBusiness.parscelasVencidas(despesa.parcelas)
        if ((parcelasVencidas).length > 0)
            await this.alterarSituacao(despesa, parcelasVencidas, FinanceiroEnum.VENCIDA)

        return despesa;
    }

    // RF12.3 Excluir despesa
    async remove(uuid: string): Promise<DespesaEntity> {
        const despesa = await this.findOneByUuid(uuid);
        return this.despesaRepository.remove(despesa);
    }

    // RF12.5.1 Realizar pagamento de parcela
    // RF12.5.2 Anexar comprovante de pagamento na parcela
    async pagar(request: DespesaParcelaSituacaoRequest, comprovante: string) {
        const { situacao, despesa_uuid, parcela } = request
        const despesa = await this.findOneByUuid(despesa_uuid);
        await this.despesaParcelaRepository
            .createQueryBuilder()
            .update(DespesaParcelasEntity)
            .set({ situacao: situacao, comprovante })
            .where("despesaId = :despesaId", { despesaId: despesa.id })
            .andWhere("parcela = :parcela", { parcela: parcela })
            .execute();
    }

    /* 
    RF12.5.2 Anexar comprovante de pagamento na parcela
    RF12.4.2.1 Salvar a data de pagamento ao ralizar o pagamento integral da despesa
    */
    async pagarDespesa(uuid: string) {
        await this.despesaRepository
            .createQueryBuilder()
            .update(DespesaEntity)
            .set({
                situacao: FinanceiroEnum.PAGA,
                data_pagamento: new Date()
            })
            .where("uuid = :uuid", { uuid })
            .execute();
    }

    async alterarSituacao(
        despesa: DespesaEntity,
        parcelas: DespesaParcelasEntity[],
        situacao: FinanceiroEnum
    ) {
        despesa.situacao = situacao
        this.despesaRepository.save(despesa)
        parcelas.forEach(parcela => {
            parcela.situacao = situacao
            this.despesaParcelaRepository.save(parcela)
        })
    }
}
