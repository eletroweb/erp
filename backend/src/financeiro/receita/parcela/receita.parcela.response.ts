import { FinanceiroEnum } from "src/enum/financeiro.enum";

export class ReceitaParcelaResponse {
    uuid: string;
    parcela: number;
    valor: number;
    data_vencimento: string;
    comprovante: string;
    situacao: FinanceiroEnum;
}  