import express from 'express'

const router = express.Router()

import {
    cadastrarSetor,
    listarSetores,
    deletarSetor,
    editarSetor,
    exibirSetor
} from "../services/SetorService.js"

router.get('/', async function (req, res) {
    const setores = await listarSetores()
    res.json(setores)
})

router.get('/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let setor = await exibirSetor(uuid)
    res.send(setor)
})

router.put(`/:id`, async function (req, res) {
    const id = req.params.id
    const setor = req.body
    const result = await editarSetor(id, setor)
    res.json(result)
})

router.post('/', async function (req, res) {
    const setor = req.body
    const result = await cadastrarSetor(setor)
    res.json(result)
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const result = await deletarSetor(id)
    res.send(result)
})

export default router