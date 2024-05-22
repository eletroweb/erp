import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { DespesaEntity } from '../despesa.entity';
import { v4 as uuidv4 } from 'uuid';
import { DespesaParcelaRequest } from './despesa.parcela.request';
import { FinanceiroEnum } from 'src/enum/financeiro.enum';
import { DespesaParcelaResponse } from './despesa.parcela.response';
import dayjs from 'dayjs'

@Entity('financeiro_despesas_parcelas')
export class DespesaParcelasEntity {
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

  @ManyToOne(() => DespesaEntity, despesa => despesa.parcelas)
  despesa: DespesaEntity;

  @Column({ nullable: true })
  comprovante: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static toEntity(dto: DespesaParcelaRequest): DespesaParcelasEntity {
    const entity = new DespesaParcelasEntity();
    entity.data_vencimento = this.parseDate(dto.data_vencimento);
    entity.valor = dto.valor;
    entity.parcela = dto.parcela;
    entity.situacao = dto.situacao;
    return entity;
  }

  toDto(): DespesaParcelaResponse {
    const dto = new DespesaParcelaResponse();
    dto.uuid = this.uuid;
    dto.data_vencimento = this.parseStringDate(this.data_vencimento)
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