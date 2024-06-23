import { SituacaoEnum } from 'src/enum/situacao.enum';

export class EmpresaResponseDto {
  readonly id: number;
  readonly email: string;
  readonly uuid: string;
  readonly razaoSocial: string;
  readonly nomeFantasia: string;
  readonly cnpj: string;
  readonly cep: string;
  readonly estado: string;
  readonly cidade: string;
  readonly endereco: string;
  readonly numero: string;
  readonly complemento: string;
  readonly logomarca: string;
  readonly situacao: SituacaoEnum;
}
