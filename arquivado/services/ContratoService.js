import db from "../config/db.js"

db.connect()

export async function listar() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM contratos`;
        db.query(query, function (error, contratos) {
            if (error) {
                reject(error);
                return;
            }

            const contratosSemId = contratos.map(({ id: _, ...setor }) => setor);

            resolve(contratosSemId);
        });
    });
}

export async function exibir(uuid) {

    const registro = await localizarContratoPorUuid(uuid)
    if (!registro)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM contratos WHERE uuid = ?"
        db.query(query, [uuid], function (error, contratos) {
            if (error) {
                reject(error);
                return;
            }

            if (contratos.length > 0) {
                const { id: _, ...setor } = contratos[0];
                resolve(setor);
            } else {
                resolve("Setor não localizado");
            }
        });
    });
}

export async function cadastrar(contrato) {
    const { descricao, situacao, orcamento} = contrato;
    const data_inicio = formatarData(contrato.data_inicio)
    const data_fim = formatarData(contrato.data_fim)

    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO contratos (descricao, situacao, orcamento, data_inicio, data_fim)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [descricao, situacao, orcamento, data_inicio, data_fim], function (error) {
            if (error) {
                reject(error);
            } else {
                resolve("Cadastro realizado com sucesso");
            }
        });
    });
}

export function localizarContratoPorUuid(uuid) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM contratos WHERE uuid = ?'

        db.query(query, [uuid], function (error, contratos, fields) {
            if (error) {
                reject(error);
            }

            if (contratos.length > 0) {
                resolve(contratos[0]);
            } else {
                resolve(null);
            }
        });
    });
}

export async function deletar(uuid) {
    const registro = await localizarContratoPorUuid(uuid)
    if (!registro)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "DELETE FROM contratos WHERE id = ?"
        db.query(query, [registro.id], function (error) {
            if (error)
                reject(error)

            resolve("Setor excluido com sucesso");
        })
    })
}

export async function editar(uuid, contrato) {
    const { descricao, situacao, orcamento } = contrato;

    const data_inicio = formatarData(contrato.data_inicio)
    const data_fim = formatarData(contrato.data_fim)

    const contratoCadastrado = await localizarContratoPorUuid(uuid);
    if (!contratoCadastrado)
        return "Contrato não localizado.";

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE contratos 
            SET descricao = ?, situacao = ?, orcamento = ?, data_inicio = ?, data_fim = ? 
            WHERE id = ?
        `;
        db.query(query, [descricao, situacao, orcamento, data_inicio, data_fim, contratoCadastrado.id], function (error) {
            if (error) {
                reject(error);
            } else {
                resolve("Edição realizada com sucesso.");
            }
        });
    });
}

function formatarData(dataString) {
    const data = new Date(dataString);

    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
}
