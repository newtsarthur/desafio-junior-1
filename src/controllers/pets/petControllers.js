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

//Update pet
export const updatePet = async (req, res) => {
  try {
    const userId = req.userId;
    const petId = req.params.petId;
    const { name, birthDate, type, race } = req.body;

    if(!userId || !petId)
    {
      return res.status(400).json({ message: "Usuário ou pet inválido "});
    }

    const pet = await prisma.pet.findFirst({
      where: { id: petId, userId },
    })
    
    if(!pet) {
      return res.status(404).json({ message: "Pet não encontrado ou não pertence ao usuário "});
    }

    const updatePet = await prisma.pet.update({
      where: { id: petId },
      data: {
        name,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        type,
        race,
      },
    });

    res.status(200).json(updatePet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar informações do pet"});
  }
}

//Get Pet
export const getPet = async (req, res) => {
  try {
    const userId = req.userId;

    if(!userId)
    {
      res.status(400).json({message: "Usuário incorreto"});
    }

    const pets = await prisma.pet.findMany({
      where: { userId },
    });

    res.status(200).json({
      message: 'Pets do usuário listados com sucesso',
      pets
    });
    

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Erro ao ler pet"})
  }
}

//Delete pet
export const deletePet = async (req, res) => {
  try {
    const userId = req.userId;
    const petId = req.params.petId;

    if (!userId || !petId) {
      return res.status(400).json({ message: "Usuário inválido ou pet inválido" });
    }

    const pet = await prisma.pet.findFirst({
      where: { id: petId, userId },
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado ou não pertence ao usuário" });
    }

    await prisma.pet.delete({
      where: { id: petId },
    });

    res.status(200).json({ message: "Pet deletado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar pet do db" });
  }
};