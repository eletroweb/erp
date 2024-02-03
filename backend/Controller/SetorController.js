import express from 'express'

const router = express.Router()

import {
    cadastrarSetor,
    listarSetores,
    deletarSetor,
    editarSetor,
    editarListaSetores,
    exibirSetor,
    situacaoSetor
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

router.put(`/:uuid`, async function (req, res) {
    const uuid = req.params.uuid
    const setor = req.body
    const result = await editarSetor(uuid, setor)
    res.json(result)
})

router.post(`/editarLista/`, async function (req, res) {
    const setores = req.body
    const result = await editarListaSetores(setores)
    res.json(result)
})

router.put(`/situacao/:uuid`, async function (req, res) {
    const uuid = req.params.uuid
    const { situacao } = req.body
    const result = await situacaoSetor(uuid, situacao)
    res.json(result)
})


router.post('/', async function (req, res) {
    const setor = req.body
    const result = await cadastrarSetor(setor)
    res.json({
        title: 'Cadastro de setor',
        message: result,
        type: 'success',
    })
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const result = await deletarSetor(id)
    res.send(result)
})

export default router