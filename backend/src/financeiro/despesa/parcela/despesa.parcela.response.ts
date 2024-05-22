import { FinanceiroEnum } from "src/enum/financeiro.enum";

export class DespesaParcelaResponse {
    uuid: string;
    parcela: number;
    valor: number;
    data_vencimento: string;
    comprovante: string;
    situacao: FinanceiroEnum;
}  