import db from "../config/db.js"
import {obterAtributosDoCliente} from "./ClienteAtributosService.js"

db.connect()

export async function listarClientes(paginacao) {
    return new Promise((resolve, reject) => {
        const offset = (paginacao.pagina - 1) * paginacao.quantidade;
        const query = `
            SELECT * FROM clientes
            LIMIT ?, ?
        `;
        db.query(query, [offset, paginacao.quantidade], function (error, clientes) {
            if (error) {
                reject(error);
                return;
            }

            const cliente = clientes.map(({ id: _, ...cliente }) => cliente);
            resolve(cliente);
        });
    });
}

export async function exibirCliente(uuid) {

    const registro = await findByUuid(uuid)
    if (!registro)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM clientes WHERE uuid = ?"
        db.query(query, [uuid], async function (error, clientes) {
            if (error) {
                reject(error);
                return;
            }

            if (clientes.length > 0) {
                const { id: _, ...cliente } = clientes[0];
                cliente.attributos = await obterAtributosDoCliente(clientes[0].uuid)
                resolve(cliente);
            } else {
                resolve("Cliente não localizado");
            }
        });
    });
}

export async function cadastrarCliente(cliente) {
    const {
        nome,
        email,
        documento,
        estado,
        cidade,
        endereco,
        complemento,
        situacao,
        setor_id,
    } = cliente

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO clientes (nome,email,documento,estado,cidade,endereco,complemento,situacao,setor_id) VALUES (?,?,?,?,?,?,?,?,?)`;
        db.query(query, [
            nome,
            email,
            documento,
            estado,
            cidade,
            endereco,
            complemento,
            situacao,
            setor_id
        ], function (error) {
            if (error)
                reject(error);

            resolve("Cadastro realizado com sucesso");
        });
    });
}

export function findByUuid(uuid) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM clientes WHERE uuid = ?'

        db.query(query, [uuid], function (error, clientes, fields) {
            if (error) {
                reject(error);
            }

            if (clientes.length > 0) {
                resolve(clientes[0]);
            } else {
                resolve(null);
            }
        });
    });
}

export async function deletarCliente(uuid) {
    const registro = await findByUuid(uuid)
    if (!registro)
        return "Registro não localizado"

    return new Promise((resolve, reject) => {
        const query = "DELETE FROM clientes WHERE id = ?"
        db.query(query, [registro.id], function (error) {
            if (error)
                reject(error)

            resolve("Cliente excluido com sucesso");
        })
    })
}

export async function editarCliente(uuid, cliente) {
    const {
        nome,
        email,
        documento,
        estado,
        cidade,
        endereco,
        complemento,
        situacao,
        setor_id,
    } = cliente;

    const clienteCadastrado = await findByUuid(uuid)
    if (!clienteCadastrado)
        return "Cliente não localizado."

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE clientes 
            SET nome=?, email=?, documento=?, estado=?, cidade=?, endereco=?, complemento=?, situacao=?, setor_id=?
            WHERE id=?
        `;
        db.query(query, [
            nome,
            email,
            documento,
            estado,
            cidade,
            endereco,
            complemento,
            situacao,
            setor_id,
            clienteCadastrado.id
        ], function (error) {
            if (error) {
                reject(error);
                return;
            }

            resolve("Atualização realizada com sucesso");
        });
    });
}


export async function editarListaClientes(clientes) {
    clientes.forEach(cliente => {
        editarCliente(cliente.uuid, cliente)
    });
}

export async function situacaoCliente(uuid, stiuacao) {
    const clienteCadastrado = await findByUuid(uuid)
    if (!clienteCadastrado)
        return "Cliente não localizado."

    return new Promise((resolve, reject) => {
        const query = `UPDATE clientes SET situacao = ? WHERE uuid = ?`;
        db.query(query, [stiuacao, uuid], function (error) {
            if (error)
                reject(error);
            resolve("Situação alterada com sucesso")
        })
    })
}