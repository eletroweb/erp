import db from "../config/db.js"
import {localizarContratoPorUuid} from "./ContratoService.js"

db.connect()

export async function listarServicos(paginacao) {
    return new Promise((resolve, reject) => {
        const offset = (paginacao.pagina - 1) * paginacao.quantidade
        const query = `
            SELECT s.*, c.uuid contrato_id FROM servicos s
            JOIN contratos c on c.id = s.contrato_id
            LIMIT ?, ?
        `;
        db.query(query, [offset, paginacao.quantidade], function (error, servicos) {
            if (error) {
                reject(error)
                return
            }

            const servico = servicos.map(({ id: _, ...servico }) => servico);
            resolve(servico)
        });
    });
}

export async function exibirServico(uuid) {
    const registro = await localizarServicoPorUuid(uuid)
    if (!registro)
        return "Serviço não localizado"

    return new Promise((resolve, reject) => {
        const query = `SELECT s.*, c.uuid contrato_id FROM servicos s
        JOIN contratos c on c.id = s.contrato_id WHERE s.uuid = ?`
        db.query(query, [uuid], async function (error, servicos) {
            if (error) {
                reject(error);
                return
            }

            if (servicos.length > 0) {
                const { id: _, ...servico } = servicos[0];
                resolve(servico);
            } else {
                resolve("Servico não localizado")
            }
        });
    });
}

export async function cadastrarServico(servico) {
    const { descricao, situacao, valor, contratoUuid } = servico
    const contrato = await localizarContratoPorUuid(contratoUuid)

    if (!contrato)
        return "Contrato não localizado"

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO servicos (descricao, situacao, valor, contrato_id) VALUES (?,?,?,?)`
        db.query(query, [
            descricao, situacao, valor, contrato.id
        ], function (error) {
            if (error)
                reject(error)

            resolve("Serviço cadastrado com sucesso")
        });
    });
}

export function localizarServicoPorUuid(uuid) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM servicos WHERE uuid = ?'

        db.query(query, [uuid], function (error, servicos, fields) {
            if (error) {
                reject(error);
            }

            if (servicos.length > 0) {
                resolve(servicos[0]);
            } else {
                resolve(null);
            }
        });
    });
}

export async function deletarServico(uuid) {
    const servico = await localizarServicoPorUuid(uuid)
    if (!servico)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "DELETE FROM servicos WHERE id = ?"
        db.query(query, [servico.id], function (error) {
            if (error)
                reject(error)

            resolve("Servico excluído com sucesso");
        })
    })
}

export async function editarServico(uuid, servico) {
    const { descricao, situacao, valor, contrato_id } = servico
    const contrato = await localizarContratoPorUuid(contrato_id)

    if (!contrato)
        return "Contrato não localizado"

    const servicoCadastrado = await localizarServicoPorUuid(uuid)
    if (!servicoCadastrado)
        return "Servico não localizado."

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE servicos 
            SET descricao=?, situacao=?, valor=?, contrato_id=?
            WHERE id=?
        `;
        db.query(query, [
            descricao, situacao, valor, contrato.id, servicoCadastrado.id
        ], function (error) {
            if (error) {
                reject(error);
                return;
            }

            resolve("Serviço atualizado com sucesso");
        });
    });
}