import jwt from 'jsonwebtoken';
import { ObjectId } from 'bson';

const JWT_SECRET = process.env.JWT_SECRET;

//Authenticator
const auth = ( req, res, next ) => {
  const token = req.headers.authorization;

  if(!token) {
    return res.status(400).json({ message: "Acesso Negado" });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    const userId = decoded.id;

    //Check if user is valid
    if(!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Id do usuário inválido. "});
    }

    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token Inválido" });
  }
};

export default auth;