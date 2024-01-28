import express from 'express'

const router = express.Router()

import {
    cadastrar,
    deletar,
    exibirContratosPorCliente,
} from "../services/ClienteContratoService.js"


router.get('/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let contrato = await exibirContratosPorCliente(uuid)
    res.send(contrato)
})

router.post('/', async function (req, res) {
    const {cliente, contrato} = req.body
    const result = await cadastrar(cliente, contrato)
    res.json(result)
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const result = await deletar(id)
    res.send(result)
})

export default router