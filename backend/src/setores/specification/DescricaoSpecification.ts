import { SelectQueryBuilder } from "typeorm";
import { SetorEntity } from "../setor.entity";
import { Specification } from 'src/financeiro/specification/Specification';

export class DescricaoSpecification implements Specification<SetorEntity> {
    constructor(private descricao: string) {}
  
    apply( query: SelectQueryBuilder<SetorEntity> ): SelectQueryBuilder<SetorEntity> { 
      return query.andWhere('setor.descricao LIKE :descricao', {
        descricao: `%${this.descricao}%`,
      });
    }
  }