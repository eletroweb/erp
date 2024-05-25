import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
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

  @Column({
    type: 'enum',
    enum: FinanceiroEnum,
  })
  situacao: FinanceiroEnum;

  @ManyToOne(() => FinanceiroEntity, financeiro => financeiro.parcelas)
  financeiro: FinanceiroEntity;

  @Column({ nullable: true })
  comprovante: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static toEntity(dto: FinanceiroParcelaRequest): FinanceiroParcelasEntity {
    const entity = new FinanceiroParcelasEntity();
    entity.data_vencimento = dayjs(dto.data_vencimento, 'DD/MM/YYYY').toDate()
    entity.valor = dto.valor;
    entity.parcela = dto.parcela;
    entity.situacao = dto.situacao;
    return entity;
  }

  toDto(): FinanceiroParcelaResponse {
    const dto = new FinanceiroParcelaResponse();
    dto.uuid = this.uuid;
    dto.data_vencimento = dayjs(this.data_vencimento).format('DD/MM/YYYY')
    dto.parcela = this.parcela;
    dto.valor = this.valor;
    dto.situacao = this.situacao;
    dto.comprovante = this.comprovante;
    return dto;
  }

  static parseDate(dataString: string) {
    const partesData = dataString.split("/");
    const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
    return new Date(dataFormatada);
  }

  parseStringDate(data: Date) {
    const [ano, mes, dia] = data.toString().split('-')
    return `${dia}/${mes}/${ano}`;
  }
}