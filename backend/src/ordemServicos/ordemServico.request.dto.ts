import { OssRequestDto } from "./oss.request.dto";

export class OrdemServicoRequestDto {
    cliente: string;
    descricao: string;
    situacao: boolean;
    setor: string;
    servicos: OssRequestDto[];
  }