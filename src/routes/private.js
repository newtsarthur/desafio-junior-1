import express from 'express';
import { deleteUsers } from '../controllers/users/userController.js';

const router = express.Router();

//Delete user router
router.delete('/delete/:id', deleteUsers);

export default router;
