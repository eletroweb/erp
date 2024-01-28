import express from 'express'

const router = express.Router()

import {
    cadastrar,
    deletar,
    listar,
} from "../services/ClienteContratoService.js"


router.get('/', async function (req, res) {
    const clinetesContratos = await listar()
    res.json(clinetesContratos)
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