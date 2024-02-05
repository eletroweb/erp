import express from 'express'

const router = express.Router()

import {
    listarServicos,
    exibirServico,
    cadastrarServico,
    editarServico,
    deletarServico
} from "../services/ServicosService.js"

function getPaginacao(req){
    const { pagina = 1, quantidade = 10} = req.query;
    return { pagina: parseInt(pagina), quantidade: parseInt(quantidade) };
}

router.get('/', async function (req, res) {
    const paginacao = getPaginacao(req);
    const servicos = await listarServicos(paginacao);
    res.json(servicos);
});

router.get('/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let servico = await exibirServico(uuid)
    res.send(servico)
})

router.put(`/:uuid`, async function (req, res) {
    const uuid = req.params.uuid
    const servico = req.body
    const result = await editarServico(uuid, servico)
    res.json(result)
})

router.post('/', async function (req, res) {
    const servico = req.body
    const result = await cadastrarServico(servico)
    res.json(result)
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const result = await deletarServico(id)
    res.send(result)
})

export default router