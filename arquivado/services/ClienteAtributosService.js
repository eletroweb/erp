import db from "../config/db.js"

db.connect()

import {localizarClientePorUuid} from "./ClienteService.js"

export async function obterAtributosDoCliente(clienteUuid) {

    const cliente = await localizarClientePorUuid(clienteUuid);
    if (!cliente)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = `
        select
        ca.uuid,
        ca.chave,
        ca.valor 
    from
        clientes_atributos ca
    join clientes c on c.id = ca.cliente_id 
    where
        c.id = ?;
        `;
        db.query(query, [cliente.id], function (error, clienteAtributos) {
            if (error) {
                reject(error);
                return;
            }
            resolve(clienteAtributos);
        });
    });
}

export async function adicionarAtributoAoCliente(atributo) {
    const {clienteUuid, chave, valor } = atributo

    const cliente = await localizarClientePorUuid(clienteUuid);
    if (!cliente)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO clientes_atributos\ (cliente_id,chave, valor) VALUES (?, ?, ?)`;
        db.query(query, [cliente.id, chave, valor], function (error) {
            if (error)
                reject(error);

            resolve("Atributo adicionado ao cliente");
        });
    });
}

export async function editarAtributoDoCliente(uuid, atributo) {
    const {chave, valor } = atributo
    return new Promise((resolve, reject) => {
        const query = `UPDATE clientes_atributos SET chave = ?, valor = ? WHERE uuid = ?`;
        db.query(query, [chave, valor, uuid], function (error) {
            if (error)
                reject(error);
            resolve("Edição realizada com sucesso.")
        })
    })
}

export async function deletarClienteAtributo(uuid) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM clientes_atributos WHERE uuid = ?"
        db.query(query, [uuid], function (error) {
            if (error)
                reject(error)

            resolve("Atributo do cliente removido com sucesso");
        })
    })
}