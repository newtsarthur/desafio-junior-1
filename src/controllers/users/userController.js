import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

//Create/Register new user
export const register = async (req, res) => {
  try {
    const user = req.body;

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
    });

    if(existingUser) {
      return res.status(400).json({ message: "Já existe uma conta com esse email!" });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    // Create user in db
    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        adress: user.adress,
        password: hashPassword,
        createdAt: new Date(),
      }
    })

    //To do token JWT
    const token = jwt.sign({ id: userDB.id }, JWT_SECRET, {expiresIn: '7d' });

    // Return token and user info
    res.status(201).json({
      token,
      user: {
        id: userDB.id,
        name: userDB.name,
        email: userDB.email,
        createdAt: userDB.createdAt,
      },
    });
  } catch (error) {
    console.error("Erro ao tentar criar a conta", error)
    res.status(500).json({ message: "Erro no servidor.", error: error.message });
  }
};