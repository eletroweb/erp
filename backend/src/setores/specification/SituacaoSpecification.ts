import { SelectQueryBuilder } from "typeorm";
import { SetorEntity } from "../setor.entity";
import { Specification } from "src/financeiro/specification/Specification";

export class SituacaoSpecification implements Specification<SetorEntity> {
    constructor(private situacao: string) {}

    apply(query: SelectQueryBuilder<SetorEntity>): SelectQueryBuilder<SetorEntity> {
        return query.andWhere('setor.situacao = :situacao', {
            situacao: this.situacao,
        });        
    }
}