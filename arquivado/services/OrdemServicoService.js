import db from "../config/db.js"
import { localizarContratoPorUuid } from "./ContratoService.js"
import {localizarServicoPorUuid} from "./ServicosService.js"


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

function removerColunasProtegidasObjeto(objeto) {
    return Object.keys(objeto).reduce((obj, key) => {
        if (!key.includes("id") || key.includes("uuid")) {
            obj[key] = objeto[key];
        }
        return obj;
    }, {});
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
    const os = await localizarOrdemServicoPorUuid(uuid)
    if (!os)
        return "Ordem de Serviço não localizada"

    os.servicos = await listarServicosDaOrdemServico(os.id)
    os.total = calcularValorTotalOs(os.servicos)
    return removerColunasProtegidasObjeto(os)
}

function calcularValorTotalOs(servicos) {
    return servicos
        .map(servico => parseFloat(servico.valor))
        .reduce((total, valor) => total + valor, 0);
}

export async function cadastrarOrdemServico(os) {
    const { observacao, situacao, contrato_id } = os
    const contrato = await localizarContratoPorUuid(contrato_id)

    if (!contrato)
        return "Ordem Serviço não localizada"

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO os_servicos (observacao, situacao) VALUES (?,?)`
        db.query(query, [
            observacao, situacao
        ], function (error) {
            if (error)
                reject(error)

            resolve("Ordem Serviço cadastrada com sucesso")
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
        db.query(query, [uuid], function (error, os) {
            if (error)
                reject(error);

            if (os.length > 0) {
                //const os = removerColunasProtegidas(oss)
                resolve(os[0]);
            }
        });
    });
}

export async function deletarOrdemServico(uuid) {
    const os = await localizarOrdemServicoPorUuid(uuid)
    if (!os)
        return "Ordem Serviço não localizado"

    return new Promise((resolve, reject) => {
        const query = "DELETE FROM oss WHERE id = ?"
        db.query(query, [os.id], function (error) {
            if (error)
                reject(error)

            resolve("Ordem Serviço excluído com sucesso");
        })
    })
}

export async function editarOrdemServico(uuid, os) {
    const { descricao, situacao, valor, contrato_id } = os
    const contrato = await localizarContratoPorUuid(contrato_id)

    if (!contrato)
        return "Ordem Serviço não localizada"

    const osCadastrado = await localizarOrdemServicoPorUuid(uuid)
    if (!osCadastrado)
        return "Ordem Serviço não localizado."

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

            resolve("Ordem Serviço atualizada com sucesso");
        });
    });
}

// Serviços associados a OS
export async function listarServicosDaOrdemServico(osId) {
    return new Promise((resolve, reject) => {
        const query = `
        select
            oss.uuid,
            s.descricao,
            s.valor,
            oss.quantidade,
            oss.observacao,
            oss.situacao
        from
            os_servicos oss
        join servicos s on
            s.id = oss.servico_id
        where
            oss.os_id =?
        `;
        db.query(query, [osId], function (error, result) {
            if (error) {
                reject(error)
                return
            }

            //const oss = removerColunasProtegidas(result)
            resolve(result)
        });
    });
}

// Localizar OSS
export function localizarServicoDaOrdemServico(oss_uuid) {
    return new Promise((resolve, reject) => {
        const query = `
        select
            *
        from
            os_servicos oss
        where
            oss.uuid = ?
        `
        db.query(query, [oss_uuid], function (error, os) {
            if (error)
                reject(error);

            if (os.length > 0) {
                resolve(os[0]);
            }
        });
    });
}

// Localizar Serviço vinculado a os com base no UUID do servico
export function findOssByServicoId(servico_id) {
    return new Promise((resolve, reject) => {
        const query = `
        select
            *
        from
            os_servicos oss
        where
            oss.servico_id = ?
        `
        db.query(query, [servico_id], function (error, os) {
            if (error)
                reject(error);

            resolve(os[0]);
        });
    });
}

// Adicionar OSS
export async function adicionarServicoDaOrdemServico(oss) {
    const {os_uuid, servico_uuid, observacao, quantidade, situacao} = oss
    const os = await localizarOrdemServicoPorUuid(os_uuid)
    if (!os)
        return "Ordem Serviço não localizado."

    const servico = await localizarServicoPorUuid(servico_uuid)
    if (!servico)
        return "Serviço não localizado"
        
    const ossCadastrada = await findOssByServicoId(servico.id)
    if (ossCadastrada){
        const ossAtualizada = {
            ...ossCadastrada,
            quantidade: ossCadastrada.quantidade + quantidade
        };
        return await atualizarQuantidadeServicoDaOrdemServico(ossAtualizada)
    } else {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO os_servicos (observacao,situacao, quantidade, os_id, servico_id) VALUES (?,?,?,?,?)`;
            db.query(query, [observacao, situacao, quantidade, os.id, servico.id], function (error) {
                if (error)
                    reject(error);
    
                resolve("Cadastro realizado com sucesso");
            });
        });   
    }
}

// Atualizar OSS
export async function atualizarQuantidadeServicoDaOrdemServico(oss) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE os_servicos SET quantidade = ? WHERE uuid = ?`;
        db.query(query, [oss.quantidade, oss.uuid], function (error) {
            if (error)
                reject(error);

            resolve("Quantidade do serviço da os incrementada com sucesso")
        })
    })
}

// Remover OSS
export async function removerServicoDaOrdemServico(oss_uuid) {
    const oss = await localizarServicoDaOrdemServico(oss_uuid)
    if (!oss)
        return "Serviço da OS não localizado"

    return new Promise((resolve, reject) => {
        const query = "DELETE FROM os_servicos WHERE id = ?"
        db.query(query, [oss.id], function (error) {
            if (error)
                reject(error)

            resolve("Serviço da OS removido com sucesso");
        })
    })
}