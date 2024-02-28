import express from 'express'
import jwt from "jsonwebtoken";

const router = express.Router()

router.post('/', async function (req, res) {
    const { email, senha } = req.body;
  
    if (!email || !senha) {
      res.status(400).json('Preencha todos os campos.');
      return;
    }
  
    const cliente = {
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: "123456"
    }
  
    if (!cliente) {
      res.status(401).send('cliente não encontrado.');
      return;
    }
  
    if (cliente.senha !== senha) {
      res.status(401).json('E-mail ou senha incorreta');
      return;
    }
  
    const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.status(200).send({ token });
})

export default router