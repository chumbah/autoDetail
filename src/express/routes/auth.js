import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

export const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/me', verifyToken, getUser);