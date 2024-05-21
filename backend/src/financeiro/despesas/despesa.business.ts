import { Injectable } from "@nestjs/common";
import { DespesaParcelasEntity } from "./parcela/despesa.parcela.entity";
import { FinanceiroEnum } from "src/enum/financeiro.enum";

@Injectable()
export class DespesaBusiness {
    async vencida(parcelas: DespesaParcelasEntity[]): Promise<boolean> {
        if (parcelas != undefined) {
            return parcelas.some(parcela => {
                const dataVencimento = new Date(parcela.data_vencimento);
                return dataVencimento < new Date() && [FinanceiroEnum.VENCIDA, FinanceiroEnum.PENDENTE].includes(parcela.situacao);
            });
        }
        return false
    }

    async parscelasVencidas(parcelas: DespesaParcelasEntity[]): Promise<DespesaParcelasEntity[]> {
        if (parcelas != undefined) {
            return parcelas.filter(parcela => {
                const dataVencimento = new Date(parcela.data_vencimento);
                return dataVencimento < new Date() && [FinanceiroEnum.VENCIDA, FinanceiroEnum.PENDENTE].includes(parcela.situacao);
            });
        }
        return [];
    }
}