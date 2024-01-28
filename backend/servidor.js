import express from 'express'
import cors from 'cors'

import SetorController from './Controller/SetorController.js'
import ClienteController from './Controller/ClienteController.js'
import ContratoController from './Controller/ContratoController.js'

const app = express()
const porta = 3000


app.use(cors())
app.use(express.json())

app.use('/setores', SetorController)
app.use('/clientes', ClienteController)
app.use('/contratos', ContratoController)

app.listen(porta, () => `Servidor UP http://localhost:${porta}`)