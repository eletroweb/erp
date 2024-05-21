import { Injectable } from "@nestjs/common";
import { DespesaParcelasEntity } from "./despesa.parcela.entity";
import { FinanceiroEnum } from "src/enum/financeiro.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DespesaParcelaRequest } from "./despesa.parcela.request";
import { DespesaEntity } from "../despesa.entity";

@Injectable()
export class DespesaParcelaService {

    constructor(
        @InjectRepository(DespesaParcelasEntity)
        private readonly despesaParcelaRepository: Repository<DespesaParcelasEntity>,
    ) { }

    async todasParcelasPagas(parcelas: DespesaParcelasEntity[]): Promise<boolean> {
        return parcelas.every(parcela => parcela.situacao === FinanceiroEnum.PAGA);
    }

    async adicionarParcelaNaDespesa(
        despesa: DespesaEntity, parcelas: DespesaParcelaRequest[]
    ): Promise<DespesaEntity> {
            const requestParcelIds = parcelas.map(parcela => parcela.parcela);
            await this.despesaParcelaRepository
                .createQueryBuilder()
                .delete()
                .where("despesaId = :despesaId AND parcela NOT IN (:...requestParcelIds)",
                    { despesaId: despesa.id, requestParcelIds: requestParcelIds })
                .orWhere("despesaId = :despesaId", { despesaId: despesa.id })
                .execute();

            const newParcelas = parcelas.map(despesa =>
                DespesaParcelasEntity.toEntity(despesa)
            );
            despesa.parcelas = newParcelas;

        await this.despesaParcelaRepository
            .createQueryBuilder()
            .delete()
            .from(DespesaParcelasEntity)
            .where("despesaId = :despesaId", { despesaId: despesa.id })
            .execute();

        return despesa
    }
}
