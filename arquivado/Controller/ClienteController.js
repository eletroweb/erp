import express from 'express'

const router = express.Router()

import {
    cadastrarCliente,
    listarClientes,
    deletarCliente,
    editarCliente,
    editarListaClientes,
    exibirCliente,
    situacaoCliente
} from "../services/ClienteService.js"

import {
    obterAtributosDoCliente, 
    editarAtributoDoCliente,
    adicionarAtributoAoCliente,
    deletarClienteAtributo
} from "../services/ClienteAtributosService.js"

function getPaginacao(req){
    const { pagina = 1, quantidade = 10} = req.query;
    return { pagina: parseInt(pagina), quantidade: parseInt(quantidade) };
}

router.get('/', async function (req, res) {
    const paginacao = getPaginacao(req);
    const clientes = await listarClientes(paginacao);
    res.json(clientes);
});

router.get('/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let cliente = await exibirCliente(uuid)
    res.send(cliente)
})

router.put(`/:uuid`, async function (req, res) {
    const uuid = req.params.uuid
    const cliente = req.body
    const result = await editarCliente(uuid, cliente)
    res.json(result)
})

router.post(`/editarLista/`, async function (req, res) {
    const clientes = req.body
    const result = await editarListaClientes(clientes)
    res.json(result)
})

router.put(`/situacao/:uuid`, async function (req, res) {
    const uuid = req.params.uuid
    const { situacao } = req.body
    const result = await situacaoCliente(uuid, situacao)
    res.json(result)
})

router.post('/', async function (req, res) {
    const cliente = req.body
    const result = await cadastrarCliente(cliente)
    res.json(result)
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const result = await deletarCliente(id)
    res.send(result)
})


// Atributos do cliente
router.get('/atributos/:clienteUuid', async function (req, res) {
    const clienteUuid = req.params.clienteUuid
    let atributos = await obterAtributosDoCliente(clienteUuid)
    res.send(atributos)
})

router.post('/atributos', async function (req, res) {
    const atributo = req.body
    let atributos = await adicionarAtributoAoCliente(atributo)
    res.send(atributos)
})

router.put('/atributos/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    const atributo = req.body
    let atributos = await editarAtributoDoCliente(uuid, atributo)
    res.send(atributos)
})

router.delete('/atributos/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let atributos = await deletarClienteAtributo(uuid)
    res.send(atributos)
})

export default router