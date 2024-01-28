import express from 'express'

const router = express.Router()

import {
    listarOrdemServicos,
    exibirOrdemServico,
    cadastrarOrdemServico,
    editarOrdemServico,
    deletarOrdemServico
} from "../services/OrdemServicoService.js"

function getPaginacao(req){
    const { pagina = 1, quantidade = 10} = req.query;
    return { pagina: parseInt(pagina), quantidade: parseInt(quantidade) };
}

router.get('/', async function (req, res) {
    const paginacao = getPaginacao(req);
    const os = await listarOrdemServicos(paginacao);
    res.json(os);
});

router.get('/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let os = await exibirOrdemServico(uuid)
    res.send(os)
})

router.put(`/:uuid`, async function (req, res) {
    const uuid = req.params.uuid
    const os = req.body
    const result = await editarOrdemServico(uuid, os)
    res.json(result)
})

router.post('/', async function (req, res) {
    const os = req.body
    const result = await cadastrarOrdemServico(os)
    res.json(result)
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const result = await deletarOrdemServico(id)
    res.send(result)
})

export default router