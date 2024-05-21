export function formatarReal(valor: number | string): string {
    const onlyDigits = valor.toString().replace(/[^\d]/g, '');
    const digitsLength = onlyDigits.length;

    if (digitsLength < 3)
        return 'R$ 0,' + onlyDigits.padStart(2, '0');

    const valorFormatado = onlyDigits.slice(0, -2) + ',' + onlyDigits.slice(-2);

    const valorEmReais = parseFloat(valorFormatado.replace(',', '.')).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return valorEmReais;
}

export function getCorPorSituacao(situacao: string): string {
    const cores = {
        PAGA: "green",
        PENDENTE: "orange",
        VENCIDA: "red",
        ARQUIVADO: "grey"
    };
    return cores[situacao] || "black";
}