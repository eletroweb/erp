import { Injectable } from "@nestjs/common";
import { ReceitaParcelasEntity } from "./parcela/receita.parcela.entity";
import { FinanceiroEnum } from "src/enum/financeiro.enum";

@Injectable()
export class ReceitaBusiness {
    async vencida(parcelas: ReceitaParcelasEntity[]): Promise<boolean> {
        if (parcelas != undefined) {
            return parcelas.some(parcela => {
                const dataVencimento = new Date(parcela.data_vencimento);
                return dataVencimento < new Date() && [FinanceiroEnum.VENCIDA, FinanceiroEnum.PENDENTE].includes(parcela.situacao);
            });
        }
        return false
    }

    async parscelasVencidas(parcelas: ReceitaParcelasEntity[]): Promise<ReceitaParcelasEntity[]> {
        if (parcelas != undefined) {
            return parcelas.filter(parcela => {
                const dataVencimento = new Date(parcela.data_vencimento);
                return dataVencimento < new Date() && [FinanceiroEnum.VENCIDA, FinanceiroEnum.PENDENTE].includes(parcela.situacao);
            });
        }
        return [];
    }
}