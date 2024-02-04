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
    const contratos = await listar()

    const contratosFormatados = contratos.map(contrato => ({
        ...contrato,
        "data_inicio": formatarData(contrato["data_cadastro"]),
        "data_fim": formatarData(contrato["data_atualizacao"])
    }));

    res.json(contratosFormatados)
})

router.get('/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let contrato = await exibir(uuid)

    /* const contratoFormatado = {
        ...contrato,
        "data_inicio": formatarData(contrato["data_cadastro"]),
        "data_fim": formatarData(contrato["data_atualizacao"])
    };*/

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

function formatarData(dataString) {
    const data = new Date(dataString);
    
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${ano}`;
}

export default router