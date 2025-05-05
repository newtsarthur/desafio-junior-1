import express from 'express';
import { deleteUser, updateUser } from '../controllers/users/userController.js';
import { deletePet, updatePet } from '../controllers/pets/petControllers.js';
import auth from '../middlewares/auth.js'; 

const router = express.Router();

//Delete user router
router.delete('/delete/:id', deleteUser);

//Delete pet router
router.delete('/deletepet/:petId', auth, deletePet);

//Update user router
router.put('/update/:id', auth, updateUser);

//Update pet router
router.put('/updatepet/:petId', auth, updatePet);
export default router;
