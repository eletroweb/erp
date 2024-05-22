import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { ReceitaEntity } from '../receita.entity';
import { v4 as uuidv4 } from 'uuid';
import { ReceitaParcelaRequest } from './receita.parcela.request';
import { FinanceiroEnum } from 'src/enum/financeiro.enum';
import { ReceitaParcelaResponse } from './receita.parcela.response';

@Entity('financeiro_receitas_parcelas')
export class ReceitaParcelasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column()
  parcela: number;

  @Column('decimal', { precision: 6, scale: 2 })
  valor: number;

  @Column({ type: 'date' })
  data_vencimento: Date;

  @Column({
    type: 'enum',
    enum: FinanceiroEnum,
  })
  situacao: FinanceiroEnum;

  @ManyToOne(() => ReceitaEntity, receita => receita.parcelas)
  receita: ReceitaEntity;

  @Column({ nullable: true })
  comprovante: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static toEntity(dto: ReceitaParcelaRequest): ReceitaParcelasEntity {
    const entity = new ReceitaParcelasEntity();
    entity.data_vencimento = this.parseDate(dto.data_vencimento);
    entity.valor = dto.valor;
    entity.parcela = dto.parcela;
    entity.situacao = dto.situacao;
    return entity;
  }

  toDto(): ReceitaParcelaResponse {
    const dto = new ReceitaParcelaResponse();
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