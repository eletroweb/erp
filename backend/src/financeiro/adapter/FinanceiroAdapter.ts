import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { FinanceiroEnum, FinanceiroCentroDeCustoEnum } from 'src/enum/financeiro.enum';
import { FinanceiroResponseDto } from '../financeiro.response.dto';
import { FinanceiroRequestDto } from '../financeiro.request.dto';
import { ContratoEntity } from 'src/contratos/contrato.entity';
import { SetorEntity } from 'src/setores/setor.entity';
import { FinanceiroEntity } from '../financeiro.entity';

@Injectable()
export class FinanceiroAdapter {
    toDto(entity: any): FinanceiroResponseDto {
        const existeRegistroVencidoOuPendente = (parcelas: any[]) => {
            if (parcelas != undefined) {
                return parcelas.some((parcela) => {
                    return (
                        dayjs(parcela.data_vencimento)
                            .startOf('day')
                            .isBefore(dayjs().startOf('day')) &&
                        [FinanceiroEnum.VENCIDA, FinanceiroEnum.PENDENTE].includes(
                            parcela.situacao,
                        )
                    );
                });
            }
            return false;
        };

        const valor_pago = (parcelas: any[]) => {
            if (parcelas != undefined) {
                return parcelas
                    .filter((parcela) => parcela.situacao === FinanceiroEnum.PAGA)
                    .reduce((acc, parcela) => acc + parseFloat(parcela.valor), 0);
            }
            return 0;
        };

        const todasParcelasPagas = (parcelas: any[]) => {
            if (parcelas != undefined)
                return parcelas.every(
                    (parcela) => parcela.situacao === FinanceiroEnum.PAGA,
                );
        };

        const financeiroParcelada = (parcelas: any[]) => {
            if (parcelas != undefined) return parcelas.length > 1;

            return false;
        };

        const dto = new FinanceiroResponseDto();
        dto.uuid = entity.uuid;
        dto.categoria = entity.categoria;
        dto.tipo = entity.tipo;
        dto.setor = entity.setor?.toDto();
        dto.contrato = entity.contrato?.toDto();
        dto.descricao = entity.descricao;
        dto.fornecedor = entity.fornecedor;
        dto.observacao = entity.observacao;
        dto.data_vencimento = entity.data_vencimento;
        dto.vencida = existeRegistroVencidoOuPendente(entity.parcelas);
        dto.todas_parcelas_pagas = todasParcelasPagas(entity.parcelas);
        dto.data_pagamento = entity.data_pagamento;
        dto.valor_cobranca = entity.valor_cobranca;
        dto.valor_pago = valor_pago(entity.parcelas);
        dto.parcelada = financeiroParcelada(entity.parcelas);
        dto.situacao = entity.situacao;
        dto.numero_parcelas = entity.numero_parcelas;
        dto.parcelas = (entity.parcelas ?? []).map((parcela) => parcela.toDto());
        dto.centro_custo = entity.setor == null ? FinanceiroCentroDeCustoEnum.CONTRATO : FinanceiroCentroDeCustoEnum.SETOR;

        return dto;
    }

    toEntity(
        dto: FinanceiroRequestDto,
        setor: SetorEntity,
        contrato: ContratoEntity,
    ): FinanceiroEntity {
        const entity = new FinanceiroEntity();
        entity.categoria = dto.categoria;
        entity.tipo = dto.tipo;
        entity.setor = setor;
        entity.contrato = contrato;
        entity.descricao = dto.descricao;
        entity.fornecedor = dto.fornecedor;
        entity.observacao = dto.observacao;
        entity.data_vencimento = dayjs(dto.data_vencimento, 'DD/MM/YYYY').toDate();
        entity.data_pagamento = dto.data_pagamento != null ? new Date(dto.data_pagamento) : null;
        entity.valor_cobranca = dto.valor_cobranca;
        entity.parcelada = dto.parcelada;
        entity.situacao = dto.situacao;
        entity.numero_parcelas = dto.numero_parcelas;
        return entity;
    }
}