import jwt from "jsonwebtoken";

const erro = {erro: true, mensagem: 'Autenticação inválida'}

const AuthorizationMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    res.status(401).json(erro)
    return
  }

  const token = authorizationHeader.split(' ')[1]
  try {
    const auth = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = auth
    next();
  } catch (error) {
    res.status(401).json(erro)
  }
};

export default AuthorizationMiddleware