import db from "../config/db.js"
import {localizarClientePorUuid} from "./ClienteService.js"
import {localizarContratoPorUuid} from "./ContratoService.js"

db.connect()

export async function exibir(clienteUuid) {

    const cliente = await localizarClientePorUuid(clienteUuid);
    if (!cliente)
        return "Cliente não localizado"

    return new Promise((resolve, reject) => {
        const query = `select
        cc.uuid,
        cli.nome,
        c.data_inicio,
        c.data_fim,
        c.orcamento,
        c.situacao 
    from cliente_contratos cc
    join clientes cli on cli.id  = cc.cliente_id
    join contratos c on c.id = cc.contrato_id where cli.id = ?`;
        db.query(query,[cliente.id], function (error, contratos) {
            if (error) {
                reject(error);
                return;
            }

            const contratosSemId = contratos.map(({ id: _, ...setor }) => setor);
            
            resolve(contratosSemId);
        });
    });
}

export async function cadastrar(clienteUuid, contratoUuid) {
    const cliente = await localizarClientePorUuid(clienteUuid);
    if (!cliente)
        return "Cliente não localizado"

    const contrato = await localizarContratoPorUuid(contratoUuid);
    if (!contrato)
        return "Contrato não localizado"

    return new Promise((resolve, reject) => {
        const query = ` INSERT INTO cliente_contratos (cliente_id, contrato_id) VALUES (?, ?)`;
        db.query(query, [cliente.id, contrato.id], function (error) {
            if (error) {
                reject(error);
            } else {
                resolve(`Contrato associado ao cliente ${cliente.nome} com sucesso`);
            }
        });
    });
}

export function localizarClienteContratoPorUuid(uuid) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM cliente_contratos WHERE uuid = ?'

        db.query(query, [uuid], function (error, contratos, fields) {
            if (error)
                reject(error);

            if (contratos.length > 0) {
                resolve(contratos[0]);
            } else {
                resolve(null);
            }
        });
    });
}

export async function deletar(uuid) {
    const registro = await localizarClienteContratoPorUuid(uuid)
    if (!registro)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "DELETE FROM cliente_contratos WHERE id = ?"
        db.query(query, [registro.id], function (error) {
            if (error)
                reject(error)

            resolve("Registro excluido com sucesso");
        })
    })
}