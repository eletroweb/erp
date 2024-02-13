export function ValidarCNPJ(cnpj) {
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');

    // Verificar se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14)
        return false;

    // Calcular o 1º dígito verificador
    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = (peso === 2) ? 9 : peso - 1;
    }
    let digito1 = (11 - (soma % 11)) % 11;

    // Calcular o 2º dígito verificador
    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = (peso === 2) ? 9 : peso - 1;
    }
    let digito2 = (11 - (soma % 11)) % 11;

    // Verificar se os dígitos verificadores estão corretos
    return (parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2);
}

export function ValidarCPF(cpf) {
    // Remover caracteres especiais
    cpf = cpf.replace(/[^\d]/g, "");

    // Verificação de tamanho
    if (cpf.length !== 11) return false;

    // Sequências inválidas
    const invalidSequences = ["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"];
    if (invalidSequences.includes(cpf)) return false;

    // Cálculo do primeiro dígito verificador
    let somaDV1 = 0;
    for (let i = 0; i < 9; i++) {
        somaDV1 += (10 - i) * parseInt(cpf[i]);
    }
    const restoDV1 = somaDV1 % 11;
    let digitoVerificador1 = 11 - restoDV1;
    if (digitoVerificador1 > 9) digitoVerificador1 = 0;

    // Cálculo do segundo dígito verificador
    let somaDV2 = 0;
    for (let i = 0; i < 10; i++) {
        somaDV2 += (11 - i) * parseInt(cpf[i]);
    }
    const restoDV2 = somaDV2 % 11;
    let digitoVerificador2 = 11 - restoDV2;
    if (digitoVerificador2 > 9) digitoVerificador2 = 0;

    // Validação dos dígitos verificadores
    return (digitoVerificador1 === parseInt(cpf[9])) && (digitoVerificador2 === parseInt(cpf[10]));
}