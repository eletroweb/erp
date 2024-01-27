import db from "../config/db.js"

db.connect()

export async function listarSetores() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM setores`;
        db.query(query, function (error, setores) {
            if (error) {
                reject(error);
                return;
            }

            const setoresSemId = setores.map(({ id: _, ...setor }) => setor);
            
            resolve(setoresSemId);
        });
    });
}

export async function exibirSetor(uuid) {

    const registro = await findByUuid(uuid)
    if (!registro)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM setores WHERE uuid = ?"
        db.query(query, [uuid], function (error, setores) {
            if (error) {
                reject(error);
                return;
            }

            if (setores.length > 0) {
                const { id: _, ...setor } = setores[0];
                resolve(setor);
            } else {
                resolve("Setor não localizado");
            }
        });
    });
}

export async function cadastrarSetor(setor) {
    const { descricao, situacao } = setor

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO setores (descricao,situacao) VALUES (?, ?)`;
        db.query(query, [descricao, situacao], function (error) {
            if (error)
                reject(error);

            resolve("Cadastro realizado com sucesso");
        });
    });
}

export function findByUuid(uuid) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM setores WHERE uuid = ?'

        db.query(query, [uuid], function (error, setores, fields) {
            if (error) {
                reject(error);
            }

            if (setores.length > 0) {
                resolve(setores[0]);
            } else {
                resolve(null);
            }
        });
    });
}



export async function deletarSetor(uuid) {
    const registro = await findByUuid(uuid)
    if (!registro)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "DELETE FROM setores WHERE id = ?"
        db.query(query, [registro.id], function (error) {
            if (error)
                reject(error)

            resolve("Setor excluido com sucesso");
        })
    })
}

export async function editarSetor(uuid, setor) {
    const { descricao, situacao } = setor

    const setorCadastrado = await findByUuid(uuid)
    if (!setorCadastrado)
        return "Setor não localizado."

    return new Promise((resolve, reject) => {
        const query = `UPDATE setores SET descricao = ?, situacao = ? WHERE id = ?`;
        db.query(query, [descricao, situacao, setorCadastrado.id], function (error) {
            if (error)
                reject(error);
            resolve("Edição realizada com sucesso.")
        })
    })
}

export async function situacaoSetor(uuid, stiuacao) {
    const setorCadastrado = await findByUuid(uuid)
    if (!setorCadastrado)
        return "Setor não localizado."

    return new Promise((resolve, reject) => {
        const query = `UPDATE setores SET situacao = ? WHERE uuid = ?`;
        db.query(query, [stiuacao, uuid], function (error) {
            if (error)
                reject(error);
            resolve("Situação alterada com sucesso")
        })
    })
}