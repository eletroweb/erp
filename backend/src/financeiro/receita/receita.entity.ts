import { BancosEnum, FinanceiroCategoriaEnum, FinanceiroEnum, FinanceiroTipoEnum } from 'src/enum/financeiro.enum';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Double, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { ReceitaRequestDto } from './receita.request.dto';
import { ReceitaResponseDto } from './receita.response.dto';
import { v4 as uuidv4 } from 'uuid';
import { ReceitaParcelasEntity } from './parcela/receita.parcela.entity';
import { ClienteEntity } from 'src/clientes/cliente.entity';

@Entity("financeiro_receitas")
export class ReceitaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'char', length: 36 })
    uuid: string;

    @Column({
        type: 'enum',
        enum: FinanceiroTipoEnum,
        default: FinanceiroTipoEnum.VARIAVEL
    })
    tipo: FinanceiroTipoEnum;

    @Column()
    descricao: string;

    @Column({ nullable: true })
    observacao: string;

    @Column({ nullable: true })
    data_vencimento: Date;

    @Column({ nullable: true })
    data_pagamento: Date;

    @Column()
    valor_cobranca: number;

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

    @Column({
        type: 'enum',
        enum: BancosEnum,
    })
    banco: BancosEnum;

    @OneToMany(() => ReceitaParcelasEntity, parcela => parcela.receita, { cascade: true })
    parcelas: ReceitaParcelasEntity[];

    @ManyToOne(() => ClienteEntity, { eager: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: ClienteEntity;

    @BeforeInsert()
    generateUuid() {
        this.uuid = uuidv4();
    }

    static fromRequestDto(dto: ReceitaRequestDto): ReceitaEntity {
        const entity = new ReceitaEntity();
        entity.descricao = dto.descricao;
        entity.tipo = dto.tipo
        entity.observacao = dto.observacao;
        entity.data_vencimento = new Date(dto.data_vencimento);
        entity.data_pagamento = dto.data_pagamento ? new Date(dto.data_pagamento) : null;
        entity.valor_cobranca = dto.valor_cobranca;
        entity.parcelada = dto.parcelada;
        entity.situacao = dto.situacao;
        entity.numero_parcelas = dto.numero_parcelas;
        return entity;
    }


    toDto(): ReceitaResponseDto {

        const existeRegistroVencidoOuPendente = (parcelas) => {
            if (parcelas != undefined) {
                return parcelas.some(parcela => {
                    const dataVencimento = new Date(parcela.data_vencimento);
                    return dataVencimento < new Date() && [FinanceiroEnum.VENCIDA, FinanceiroEnum.PENDENTE].includes(parcela.situacao);
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
        
        const receitaParcelada = (parcelas) => {
            if (parcelas != undefined)
                return parcelas.length > 1;

            return false
        };

        const dto = new ReceitaResponseDto();
        dto.uuid = this.uuid;
        dto.descricao = this.descricao;
        dto.tipo = this.tipo
        dto.observacao = this.observacao;
        dto.data_vencimento = this.data_vencimento;
        dto.vencida = existeRegistroVencidoOuPendente(this.parcelas)
        dto.todas_parcelas_pagas = todasParcelasPagas(this.parcelas)
        dto.data_pagamento = this.data_pagamento;
        dto.valor_cobranca = this.valor_cobranca;
        dto.valor_pago = valor_pago(this.parcelas);
        dto.parcelada = receitaParcelada(this.parcelada)
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

