import express from 'express';
import { register } from '../controllers/users/userController';

const router = express.Router();

// Auth
router.post('/register', register);

export default router;