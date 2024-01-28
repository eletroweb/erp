import express from 'express'

const router = express.Router()

import {
    cadastrar,
    listar,
    deletar,
    editar,
    exibir
} from "../services/ContratoService.js"

router.get('/', async function (req, res) {
    const contratoes = await listar()
    res.json(contratoes)
})

router.get('/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let contrato = await exibir(uuid)
    res.send(contrato)
})

router.put(`/:uuid`, async function (req, res) {
    const uuid = req.params.uuid
    const contrato = req.body
    const result = await editar(uuid, contrato)
    res.json(result)
})

router.post(`/editarLista/`, async function (req, res) {
    const contratoes = req.body
    const result = await editarListaContratos(contratoes)
    res.json(result)
})

router.post('/', async function (req, res) {
    const contrato = req.body
    const result = await cadastrar(contrato)
    res.json(result)
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const result = await deletar(id)
    res.send(result)
})

export default router