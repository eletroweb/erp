import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { CargoResponseDto } from "./cargo.response.dto";
import { CargoRequestDto } from "./cargo.request.dto";

@Entity('cargos')
export class CargoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'char', length: 36 })
    uuid: string;

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @BeforeInsert()
    generateUuid() {
        this.uuid = uuidv4();
    }

    /*(Dto = data trasnference object)*/

    toDto(): CargoResponseDto {
        return {
            uuid: this.uuid,
            nome: this.nome
        };
    }

    static fromRequestDto(dto: CargoRequestDto): CargoEntity {
        const entity = new CargoEntity();
        entity.nome = dto.nome;
        return entity;
    }
}