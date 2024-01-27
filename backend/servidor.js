import express from 'express'
import cors from 'cors'

import SetorController from './Controller/SetorController.js'

const app = express()
const porta = 3000


app.use(cors())
app.use(express.json())

app.use('/setores', SetorController)

app.listen(porta, () => `Servidor UP http://localhost:${porta}`)