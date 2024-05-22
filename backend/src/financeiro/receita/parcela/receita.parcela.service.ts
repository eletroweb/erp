import { Injectable } from "@nestjs/common";
import { ReceitaParcelasEntity } from "./receita.parcela.entity";
import { FinanceiroEnum } from "src/enum/financeiro.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReceitaParcelaRequest } from "./receita.parcela.request";
import { ReceitaEntity } from "../receita.entity";

@Injectable()
export class ReceitaParcelaService {

    constructor(
        @InjectRepository(ReceitaParcelasEntity)
        private readonly receitaParcelaRepository: Repository<ReceitaParcelasEntity>,
    ) { }

    async todasParcelasPagas(parcelas: ReceitaParcelasEntity[]): Promise<boolean> {
        return parcelas.every(parcela => parcela.situacao === FinanceiroEnum.PAGA);
    }

    async adicionarParcelaNaReceita(
        receita: ReceitaEntity, parcelas: ReceitaParcelaRequest[]
    ): Promise<ReceitaEntity> {
            const requestParcelIds = parcelas.map(parcela => parcela.parcela);
            await this.receitaParcelaRepository
                .createQueryBuilder()
                .delete()
                .where("receitaId = :receitaId AND parcela NOT IN (:...requestParcelIds)",
                    { receitaId: receita.id, requestParcelIds: requestParcelIds })
                .orWhere("receitaId = :receitaId", { receitaId: receita.id })
                .execute();

            const newParcelas = parcelas.map(receita =>
                ReceitaParcelasEntity.toEntity(receita)
            );
            receita.parcelas = newParcelas;

        await this.receitaParcelaRepository
            .createQueryBuilder()
            .delete()
            .from(ReceitaParcelasEntity)
            .where("receitaId = :receitaId", { receitaId: receita.id })
            .execute();

        return receita
    }
}
