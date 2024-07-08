import { SelectQueryBuilder } from "typeorm";
import { Specification } from "src/financeiro/specification/Specification";
import { EmpresaEntity } from "src/empresa/empresa.entity";

export class EmpresaSpecification<T> implements Specification<T> {
    constructor(private empresa: EmpresaEntity) {}

    apply(query: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
        return query.andWhere('empresaId = :empresa', {
            empresa: this.empresa.id,
        });        
    }
}