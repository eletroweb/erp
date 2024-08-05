import {
  FinanceiroCategoriaEnum,
  FinanceiroEnum,
  FinanceiroTipoEnum,
} from 'src/enum/financeiro.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { FinanceiroRequestDto } from './financeiro.request.dto';

import { FinanceiroParcelasEntity } from './parcela/financeiro.parcela.entity';
import { SetorEntity } from 'src/setores/setor.entity';
import { ContratoEntity } from 'src/contratos/contrato.entity';
import { EmpresaEntity } from 'src/empresa/empresa.entity';
const dayjs = require('dayjs');

@Entity('financeiro')
export class FinanceiroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @ManyToOne(() => EmpresaEntity)
  @JoinColumn()
  empresa: EmpresaEntity

  @Column({
    type: 'enum',
    enum: FinanceiroCategoriaEnum,
    default: FinanceiroCategoriaEnum.DESPESA,
  })
  categoria: FinanceiroCategoriaEnum;

  @Column({
    type: 'enum',
    enum: FinanceiroTipoEnum,
    default: FinanceiroTipoEnum.VARIAVEL,
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

  @Column()
  juros: number;

  @Column()
  valor_total: string;

  @Column({
    type: 'enum',
    enum: FinanceiroEnum,
    default: FinanceiroEnum.PENDENTE,
  })
  situacao: FinanceiroEnum;

  @OneToMany(() => FinanceiroParcelasEntity, (parcela) => parcela.financeiro, {
    cascade: true,
  })
  parcelas: FinanceiroParcelasEntity[];

  static fromRequestDto(
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
    entity.data_vencimento = new Date(dto.data_vencimento);
    entity.data_pagamento =
      dto.data_pagamento != null ? new Date(dto.data_pagamento) : null;
    entity.valor_cobranca = dto.valor_cobranca;
    entity.parcelada = dto.parcelada;
    entity.situacao = dto.situacao;
    entity.numero_parcelas = dto.numero_parcelas;
    entity.juros = dto.juros;
    entity.valor_total = dto.valor_total;
    return entity;
  }

  static toDecimal(valorString: string): number {
    const valorLimpo = valorString.toString().replace(/[^\d,]/g, '');
    const valorFormatado = valorLimpo.replace(',', '.');
    const valorDecimal = parseFloat(valorFormatado);
    const valorArredondado = parseFloat(valorDecimal.toFixed(2));
    return valorArredondado;
  }
}
