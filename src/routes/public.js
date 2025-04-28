import express from 'express';
import { register, login } from '../controllers/users/userController.js';
import { registerPet } from '../controllers/pets/petControllers.js';

import auth from '../middlewares/auth.js'; 

const router = express.Router();

// Auth router
router.post('/register', register);
router.post('/login', login);

//Pet router
router.post('/petadd', auth, registerPet);

export default router;