import db from "../config/db.js"
import {localizarContratoPorUuid} from "./ContratoService.js"

db.connect()

function removerColunasProtegidas(colunas) {
    const conteudo = colunas.map(coluna => {
        const item = {};
        for (const key in coluna) {
          if (!key.includes("id") || key.includes("uuid")) {
            item[key] = coluna[key];
          }
        }
        return item;
      });

      return conteudo
}

export async function listarOrdemServicos(paginacao) {
    return new Promise((resolve, reject) => {
        const offset = (paginacao.pagina - 1) * paginacao.quantidade
        const query = `
            select
                os.*,
                c.nome as cliente,
                s.descricao as setor
            from
                os
            join clientes c on
                c.id = os.cliente_id
            join setores s on
                s.id = os.setor_id
            LIMIT ?, ?
        `;
        db.query(query, [offset, paginacao.quantidade], function (error, oss) {
            if (error) {
                reject(error)
                return
            }

            // const os = oss.map(({ id: _id, setor_id: _setor_id, ...os }) => os);
            const os = removerColunasProtegidas(oss)
            resolve(os)
        });
    });
}

export async function exibirOrdemServico(uuid) {
    const registro = await localizarOrdemServicoPorUuid(uuid)
    if (!registro)
        return "Ordem de Serviço não localizada"

    return registro
}

export async function cadastrarOrdemServico(os) {
    const { descricao, situacao, valor, contrato_id } = os
    const contrato = await localizarContratoPorUuid(contrato_id)

    if (!contrato)
        return "Contrato não localizado"

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO oss (descricao, situacao, valor, contrato_id) VALUES (?,?,?,?)`
        db.query(query, [
            descricao, situacao, valor, contrato.id
        ], function (error) {
            if (error)
                reject(error)

            resolve("Serviço cadastrado com sucesso")
        });
    });
}

export function localizarOrdemServicoPorUuid(uuid) {
    return new Promise((resolve, reject) => {
        const query = `
        select
        os.*,
        c.nome as cliente,
        s.descricao as setor
    from
        os
    join clientes c on
        c.id = os.cliente_id
    join setores s on
        s.id = os.setor_id
        where os.uuid = ?
        `

        db.query(query, [uuid], function (error, oss, fields) {
            if (error)
                reject(error);

            if (oss.length > 0) {
                const os = removerColunasProtegidas(oss)
                resolve(os[0]);
            } else {
                resolve(null);
            }
        });
    });
}

export async function deletarOrdemServico(uuid) {
    const os = await localizarOrdemServicoPorUuid(uuid)
    if (!os)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "DELETE FROM oss WHERE id = ?"
        db.query(query, [os.id], function (error) {
            if (error)
                reject(error)

            resolve("OrdemServico excluído com sucesso");
        })
    })
}

export async function editarOrdemServico(uuid, os) {
    const { descricao, situacao, valor, contrato_id } = os
    const contrato = await localizarContratoPorUuid(contrato_id)

    if (!contrato)
        return "Contrato não localizado"

    const osCadastrado = await localizarOrdemServicoPorUuid(uuid)
    if (!osCadastrado)
        return "OrdemServico não localizado."

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE oss 
            SET descricao=?, situacao=?, valor=?, contrato_id=?
            WHERE id=?
        `;
        db.query(query, [
            descricao, situacao, valor, contrato.id, osCadastrado.id
        ], function (error) {
            if (error) {
                reject(error);
                return;
            }

            resolve("Serviço atualizado com sucesso");
        });
    });
}