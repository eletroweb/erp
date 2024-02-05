import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SetorResponseDto } from './setor.response.dto';

@Entity('setores')
export class SetorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({ type: 'int', default: 1 })
  situacao: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  data_cadastro: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', precision: 0})
  data_atualizacao: Date;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  toDto(): SetorResponseDto {
    return {
      uuid: this.uuid,
      descricao: this.descricao,
      situacao: this.situacao,
    };
  }
}
