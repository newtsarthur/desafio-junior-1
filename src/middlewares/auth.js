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
    
  } catch (error) {
    return res.status(401).json({ message: "Token Inválido" });
  }
};

export default auth;