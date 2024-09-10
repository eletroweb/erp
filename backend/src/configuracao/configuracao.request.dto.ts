import { IsBoolean, IsIn, IsInt, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


class NotificacoesDespesasPendentesDto  {
    @IsBoolean()
    habilitado: boolean;

    @IsInt()
    @Min(1)
    dias: number;
}

export class ConfiguracaoRequestDto {
    @ValidateNested()
    @Type(() => NotificacoesDespesasPendentesDto)
    notificacoesDespesasPendentes: NotificacoesDespesasPendentesDto
}