import { FinanceiroEnum } from "src/enum/financeiro.enum";

export class FinanceiroParcelaResponse {
    uuid: string;
    parcela: number;
    valor: number;
    data_vencimento: Date;
    comprovante: string;
    situacao: FinanceiroEnum;
}  