export function formatarReal(valor: number | string): string {
    let valorString = valor.toString();

    valorString = valorString.replace(/[^\d.]/g, '');

    let valorFloat = parseFloat(valorString);

    const valorEmReais = valorFloat.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return valorEmReais;
}

export function getCorPorSituacao(situacao: string): string {
    const cores = {
        PAGA: "success",
        PENDENTE: "warn",
        VENCIDA: "danger",
        ARQUIVADO: "contrast"
    };
    return cores[situacao] || "info";
}