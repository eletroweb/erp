export class FornecedorResponseDto {
    uuid: string;
    nome: string;
    email: string;
    telefone: string;
    documento: string;
    estado?: string;
    cidade?: string;
    endereco?: string;
    complemento?: string;
    situacao?: boolean;
    data_cadastro?: Date;
    data_atualizacao?: Date;
}