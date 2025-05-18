import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { authenticateToken } from '../auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout',logoutUser)

router.get('/profile', authenticateToken, getUserProfile);

export default router;
