import { Injectable, NotFoundException } from '@nestjs/common';
import { ReceitaRequestDto } from './receita.request.dto';
import { ReceitaEntity } from './receita.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReceitaParcelasEntity } from './parcela/receita.parcela.entity';
import { ReceitaParcelaSituacaoRequest } from './parcela/receita.parcela.situacao.request';
import { FinanceiroEnum } from 'src/enum/financeiro.enum';
import { ReceitaParcelaService } from './parcela/receita.parcela.service';
import { ReceitaBusiness } from './receita.business';

@Injectable()
export class ReceitaService {

    constructor(
        @InjectRepository(ReceitaEntity)
        private readonly receitaRepository: Repository<ReceitaEntity>,
        @InjectRepository(ReceitaParcelasEntity)
        private readonly receitaParcelaRepository: Repository<ReceitaParcelasEntity>,
        private readonly receitaParcelaService: ReceitaParcelaService,
        private readonly receitaBusiness: ReceitaBusiness,
    ) { }

    // RF12.1 Listar receitas
    async findAll(): Promise<ReceitaEntity[]> {
        return this.receitaRepository.find()
    }

    // RF12.2 Cadastrar receita
    async create(request: ReceitaRequestDto): Promise<ReceitaEntity> {
        const receitaEntity = ReceitaEntity.fromRequestDto(request);

        // RF12.6.1 Adicionar parcela a receita
        const receita = await this.receitaParcelaService.adicionarParcelaNaReceita(
            receitaEntity,
            request.parcelas
        )
        return this.receitaRepository.save(receita)
    }

    // RF12.4 Alterar receita
    async update(uuid: string, request: ReceitaRequestDto): Promise<ReceitaEntity> {
        const receitaOrigin = await this.findOneByUuid(uuid);
        const receitaTarget = ReceitaEntity.fromRequestDto(request);
        const updatedReceita = this.receitaRepository.merge(receitaOrigin, receitaTarget);

        // RF12.6.1 Adicionar parcela a receita
        const receita = await this.receitaParcelaService.adicionarParcelaNaReceita(
            updatedReceita,
            request.parcelas
        )

        await this.receitaRepository.save(receita);
        return receita;
    }

    /* 
    RF12.3 Excluir receita
    RF12.4 Alterar receita
    RF12.5.1 Realizar pagamento de parcela
    RF12.5.2 Anexar comprovante de pagamento na parcela
    */
    async findOneByUuid(uuid: string): Promise<ReceitaEntity> {
        const receita = await this.receitaRepository.findOne({
            where: { uuid },
            relations: ['parcelas'],
        });

        if (!receita)
            throw new NotFoundException('Receita não localizada');

        const parcelasVencidas = await this.receitaBusiness.parscelasVencidas(receita.parcelas)
        if ((parcelasVencidas).length > 0)
            await this.alterarSituacao(receita, parcelasVencidas, FinanceiroEnum.VENCIDA)

        return receita;
    }

    // RF12.3 Excluir receita
    async remove(uuid: string): Promise<ReceitaEntity> {
        const receita = await this.findOneByUuid(uuid);
        return this.receitaRepository.remove(receita);
    }

    // RF12.5.1 Realizar pagamento de parcela
    // RF12.5.2 Anexar comprovante de pagamento na parcela
    async pagar(request: ReceitaParcelaSituacaoRequest, comprovante: string) {
        const { situacao, receita_uuid, parcela } = request
        const receita = await this.findOneByUuid(receita_uuid);
        await this.receitaParcelaRepository
            .createQueryBuilder()
            .update(ReceitaParcelasEntity)
            .set({ situacao: situacao, comprovante })
            .where("receitaId = :receitaId", { receitaId: receita.id })
            .andWhere("parcela = :parcela", { parcela: parcela })
            .execute();
    }

    /* 
    RF12.5.2 Anexar comprovante de pagamento na parcela
    RF12.4.2.1 Salvar a data de pagamento ao ralizar o pagamento integral da receita
    */
    async pagarReceita(uuid: string) {
        await this.receitaRepository
            .createQueryBuilder()
            .update(ReceitaEntity)
            .set({
                situacao: FinanceiroEnum.PAGA,
                data_pagamento: new Date()
            })
            .where("uuid = :uuid", { uuid })
            .execute();
    }

    async alterarSituacao(
        receita: ReceitaEntity,
        parcelas: ReceitaParcelasEntity[],
        situacao: FinanceiroEnum
    ) {
        receita.situacao = situacao
        this.receitaRepository.save(receita)
        parcelas.forEach(parcela => {
            parcela.situacao = situacao
            this.receitaParcelaRepository.save(parcela)
        })
    }
}
