export class NotificacoesDespesasPendentesResponseDto {
    readonly habilitado: boolean;
    readonly dias: number;
}

export class ConfiguracaoResponseDto {
    readonly uuid: string;
    readonly notificacoesDespesasPendentes: NotificacoesDespesasPendentesResponseDto;
}
