import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Situacao } from 'src/enum/situacao.enum';
import { OrdemServicoEntity } from './ordemServico.entity';
import { ServicoEntity } from 'src/servicos/servico.entity';


@Entity('oss')
export class OssEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @ManyToOne(() => OrdemServicoEntity, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'os_id' })
  ordem_servico: OrdemServicoEntity;

  @ManyToOne(() => ServicoEntity, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'servico_id' })
  servico_id: ServicoEntity;

  @Column({ type: 'int', default: 1 })
  quantidade: number;

  @Column({
    type: 'enum',
    enum: Situacao,
    default: Situacao.INATIVO,
    nullable: false
  })
  situacao: Situacao;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacao: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0, nullable: true })
  data_cadastro?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', precision: 0, nullable: true })
  data_atualizacao?: Date;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }
}

