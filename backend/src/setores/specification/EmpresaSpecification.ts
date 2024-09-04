import { SelectQueryBuilder } from "typeorm";
import { Specification } from "src/financeiro/specification/Specification";
import { EmpresaEntity } from "src/empresa/empresa.entity";

export class EmpresaSpecification<T> implements Specification<T> {
    constructor(private empresa: EmpresaEntity) {}

    apply(query: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
        if (this.empresa?.id) {
            return query.andWhere('empresaId = :empresaId', {
                empresaId: this.empresa.id });
        }

        return query;
    }
}