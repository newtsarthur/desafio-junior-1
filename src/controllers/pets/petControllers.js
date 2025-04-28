import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Create/Register new pet
export const registerPet = async ( req, res ) => {
  try {
    const userId = req.userId;

    if(!userId)
    {
      return res.status(400).json({ message: " Usuário inválido "});
    }
    //Catches on body
    const { name, birthDate, type, race } = req.body;

    const formattedBirthDate = new Date(birthDate);

    // Create pet in db
    const addpetDB = await prisma.pet.create({
      data: {
        userId,
        name,
        birthDate: formattedBirthDate,
        type,
        race,
      },
    });

    // Return pet creted in db
    res.status(201).json(addpetDB);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o pet no db" });
  }
};