import { EmpresaEntity } from "src/empresa/empresa.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('configuracao')
export class ConfiguracaoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'char', length: 36 })
    uuid: string;

    @Column({ type: 'boolean', default: true })
    notificarDespesaPendente: boolean;

    @Column({ type: 'int', default: 5 })
    notificarDespesaPendenteDias: number;

    @ManyToOne(() => EmpresaEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'empresa_id' })
    empresa: EmpresaEntity;

    @BeforeInsert()
    generateUuid() {
        this.uuid = uuidv4();
    }
}
