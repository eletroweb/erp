import { IsBoolean, IsDate, IsNotEmpty, MaxLength, MinLength } from '@nestjs/class-validator';
import { IsAfter } from 'src/validation';

export class ProjetoAtividadeRequestDto {
  @IsNotEmpty({ message: 'O projeto é obrigatório' })
  projeto: string;

  @IsNotEmpty({ message: 'O setor é obrigatório' })
  setor: string;

  @IsNotEmpty({ message: 'A situação é obrigatória' })
  @IsBoolean()
  situacao: boolean;

  @IsNotEmpty({ message: 'A data de início é obrigatória' })
  @IsDate()
  data_inicio: Date;

  @IsNotEmpty({ message: 'A data de fim é obrigatória' })
  @IsDate()
  @IsAfter('data_inicio', { message: 'A data final deve ser superior à data inicial' })
  data_fim: Date;

  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @MaxLength(255)
  @MinLength(10)
  descricao: string;

  observacao?: string;
}

