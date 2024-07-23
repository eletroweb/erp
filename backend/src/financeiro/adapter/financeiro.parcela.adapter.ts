import { Injectable } from '@nestjs/common';
import { FinanceiroParcelasEntity } from '../parcela/financeiro.parcela.entity';
import { FinanceiroParcelaRequest } from '../parcela/financeiro.parcela.request';
import { FinanceiroParcelaResponse } from '../parcela/financeiro.parcela.response';
import * as dayjs from 'dayjs';

@Injectable()
export class FinanceiroParcelaAdapter {

    toEntity(dto: FinanceiroParcelaRequest): FinanceiroParcelasEntity {
        const entity = new FinanceiroParcelasEntity();
        entity.data_vencimento = dayjs(dto.data_vencimento).toDate();
        entity.data_pagamento = dayjs(dto.data_vencimento).toDate();
        entity.valor = dto.valor;
        entity.parcela = dto.parcela;
        entity.situacao = dto.situacao;
        entity.observacao = dto.observacao;
        return entity;
    }

    toDto(entity: FinanceiroParcelasEntity): FinanceiroParcelaResponse {
        const dto = new FinanceiroParcelaResponse();
        dto.uuid = entity.uuid;
        dto.data_vencimento = entity.data_vencimento;
        dto.data_pagamento = entity.data_pagamento
        dto.parcela = entity.parcela;
        dto.valor = entity.valor;
        dto.situacao = entity.situacao;
        dto.comprovante = entity.comprovante;
        dto.observacao = entity.observacao;
        return dto;
    }
}