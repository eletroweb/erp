import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('contatos')
export class ContatoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 50 })
  nome: string;
}