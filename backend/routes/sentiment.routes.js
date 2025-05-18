import express from 'express';
import { authenticateToken } from '../auth.middleware.js';
import { getUserSentimentHistory, saveSentiment } from '../controllers/sentiment.controller.js';

const router = express.Router();

router.post('/save', authenticateToken, saveSentiment);

router.get('/history', authenticateToken, getUserSentimentHistory);


export default router;
