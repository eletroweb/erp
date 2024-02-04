import express from 'express'
import moment from 'moment';

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
        "data_inicio": formatarData(contrato["data_inicio"]),
        "data_fim": formatarData(contrato["data_fim"]),
        "resumo": resumoDias(contrato["data_inicio"], contrato["data_fim"])
    }));

    res.json(contratosFormatados)
})

router.get('/:uuid', async function (req, res) {
    const uuid = req.params.uuid
    let contrato = await exibir(uuid)
    contrato.resumo = resumoDias(contrato["data_inicio"], contrato["data_fim"])

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


/* TODO mover essas funções para um um utilitário
verificar com Erick sobre a necessidade de implementar achecagem de dias úteis
e criar uma tabela de configurações para definir isso e feriados
 */ 
function resumoDias(d1, d2) {
    const total_dias = diferencaEmDias(d1, d2)
    const dias_restantes = diferencaEmDias(new Date(), d2)
    const dias_corridos = total_dias - dias_restantes
    const percentual_decorrido = calcularPercentual(dias_corridos, total_dias)

    return {
        total_dias,
        dias_restantes,
        dias_corridos,
        percentual_decorrido
    }
}

function calcularPercentual(dias_corridos, total_dias) {
    return parseFloat(((dias_corridos / total_dias) * 100)).toFixed(2)
}

function formatarData(dataString) {
    return moment(String(dataString)).format('MM/DD/YYYY')
}

function diferencaEmDias(d1, d2) {
    const data1 = moment(d1);
    const data2 = moment(d2);
    return data2.diff(data1, 'days');
}

export default router