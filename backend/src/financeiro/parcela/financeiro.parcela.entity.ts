import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { FinanceiroEntity } from '../financeiro.entity';
import { v4 as uuidv4 } from 'uuid';
import { FinanceiroParcelaRequest } from './financeiro.parcela.request';
import { FinanceiroEnum } from 'src/enum/financeiro.enum';
import { FinanceiroParcelaResponse } from './financeiro.parcela.response';
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

@Entity('financeiro_parcelas')
export class FinanceiroParcelasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column()
  parcela: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'date' })
  data_vencimento: Date;

  @Column({ type: 'date', nullable: true })
  data_pagamento: Date;

  @Column({
    type: 'enum',
    enum: FinanceiroEnum,
  })
  situacao: FinanceiroEnum;

  @ManyToOne(() => FinanceiroEntity, (financeiro) => financeiro.parcelas)
  financeiro: FinanceiroEntity;

  @Column({ nullable: true })
  comprovante: string;

  @Column({ nullable: true })
  observacao: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static parseDate(dataString: string) {
    const partesData = dataString.split('/');
    const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
    return new Date(dataFormatada);
  }

  parseStringDate(data: Date) {
    const [ano, mes, dia] = data.toString().split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
