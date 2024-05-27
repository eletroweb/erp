import { FinanceiroCategoriaEnum, FinanceiroEnum, FinanceiroTipoEnum } from 'src/enum/financeiro.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { FinanceiroRequestDto } from './financeiro.request.dto';
import { FinanceiroResponseDto } from './financeiro.response.dto';

import { FinanceiroParcelasEntity } from './parcela/financeiro.parcela.entity';
import { SetorEntity } from 'src/setores/setor.entity';
import { ContratoEntity } from 'src/contratos/contrato.entity';
const dayjs = require('dayjs');

@Entity("financeiro")
export class FinanceiroEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'char', length: 36 })
    uuid: string;

    @Column({
        type: 'enum',
        enum: FinanceiroCategoriaEnum,
        default: FinanceiroCategoriaEnum.DESPESA
    })
    categoria: FinanceiroCategoriaEnum;

    @Column({
        type: 'enum',
        enum: FinanceiroTipoEnum,
        default: FinanceiroTipoEnum.VARIAVEL
    })
    tipo: FinanceiroTipoEnum;

    @ManyToOne(() => SetorEntity, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'setor_id' })
    setor: SetorEntity;
    
    @ManyToOne(() => ContratoEntity, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'contrato_id' })
    contrato: ContratoEntity;

    @Column()
    descricao: string;

    @Column({ default: false })
    fornecedor: string;

    @Column({ nullable: true })
    observacao: string;

    @Column({ nullable: true })
    data_vencimento: Date;

    @Column({ nullable: true })
    data_pagamento: Date;

    @Column()
    valor_cobranca: string;

    @Column({ default: false })
    parcelada: boolean;

    @Column()
    numero_parcelas: number;

    @Column({
        type: 'enum',
        enum: FinanceiroEnum,
        default: FinanceiroEnum.PENDENTE
    })
    situacao: FinanceiroEnum;    

    @OneToMany(() => FinanceiroParcelasEntity, parcela => parcela.financeiro, { cascade: true })
    parcelas: FinanceiroParcelasEntity[];

    static fromRequestDto(dto: FinanceiroRequestDto, setor: SetorEntity, contrato: ContratoEntity): FinanceiroEntity {
        const entity = new FinanceiroEntity();
        entity.categoria = dto.categoria
        entity.tipo = dto.tipo
        entity.setor = setor
        entity.contrato = contrato
        entity.descricao = dto.descricao;
        entity.fornecedor = dto.fornecedor;
        entity.observacao = dto.observacao;
        entity.data_vencimento = new Date(dto.data_vencimento);
        entity.data_pagamento = dto.data_pagamento != null ? new Date(dto.data_pagamento) : null;
        entity.valor_cobranca = dto.valor_cobranca;
        entity.parcelada = dto.parcelada;
        entity.situacao = dto.situacao;
        entity.numero_parcelas = dto.numero_parcelas;
        return entity;
    }


    toDto(): FinanceiroResponseDto {

        const existeRegistroVencidoOuPendente = (parcelas) => {
            if (parcelas != undefined) {
                return parcelas.some(parcela => {
                    return dayjs(parcela.data_vencimento).startOf('day').isBefore(dayjs().startOf('day')) && [FinanceiroEnum.VENCIDA, FinanceiroEnum.PENDENTE].includes(parcela.situacao);
                });
            }
            return false
        };

        const valor_pago = (parcelas) => {
            if (parcelas != undefined) {
                return parcelas
                    .filter(parcela => parcela.situacao === FinanceiroEnum.PAGA)
                    .reduce((acc, parcela) => acc + parseFloat(parcela.valor), 0);
            }
            return 0
        };

        const todasParcelasPagas = (parcelas) => {
            if (parcelas != undefined)
                return parcelas.every(parcela => parcela.situacao === FinanceiroEnum.PAGA);
        };

        const financeiroParcelada = (parcelas) => {
            if (parcelas != undefined)
                return parcelas.length > 1;

            return false
        };

        const dto = new FinanceiroResponseDto();
        dto.uuid = this.uuid;
        dto.categoria = this.categoria
        dto.tipo = this.tipo
        dto.setor = this.setor?.toDto()
        dto.contrato = this.contrato?.toDto()
        dto.descricao = this.descricao;
        dto.fornecedor = this.fornecedor;
        dto.observacao = this.observacao;
        dto.data_vencimento = this.data_vencimento;
        dto.vencida = existeRegistroVencidoOuPendente(this.parcelas)
        dto.todas_parcelas_pagas = todasParcelasPagas(this.parcelas)
        dto.data_pagamento = this.data_pagamento;
        dto.valor_cobranca = this.valor_cobranca;
        dto.valor_pago = valor_pago(this.parcelas);
        dto.parcelada = financeiroParcelada(this.parcelada)
        dto.situacao = this.situacao;
        dto.numero_parcelas = this.numero_parcelas;
        dto.parcelas = (this.parcelas ?? []).map(parcela => parcela.toDto());

        return dto;
    }

    static toDecimal(valorString: string): number {
        const valorLimpo = valorString.toString().replace(/[^\d,]/g, '');
        const valorFormatado = valorLimpo.replace(',', '.');
        const valorDecimal = parseFloat(valorFormatado);
        const valorArredondado = parseFloat(valorDecimal.toFixed(2));
        return valorArredondado;
    }
}