import { sentimentHistory } from '../models/sentimenthistory.model.js';
import { User } from '../models/user.model.js';
import axios from 'axios';

export const saveSentiment = async (req, res) => {
    const { tweet } = req.body;
    const userId = req.user.id;

    if (!tweet) {
        return res.status(400).json({ message: "Tweet is required" });
    }

    try {
        const user = await User.findById(userId).select('username');
        if (!user) return res.status(404).json({ message: "User not found" });

        const flaskResponse = await axios.post('http://localhost:5000/predict', { tweet });
        const sentiment = flaskResponse.data.sentiment;

        const historyEntry = await sentimentHistory.create({
            user: userId,
            tweet,
            sentiment
        });

        res.status(200).json({
            message: "Sentiment analyzed successfully",
            data: historyEntry
        });
    } catch (error) {
        console.error('Sentiment analysis error:', error.message);
        res.status(500).json({ message: "Error analyzing sentiment" });
    }
};


export const getUserSentimentHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const history = await sentimentHistory.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate('user', 'username');  
        res.status(200).json({ data: history });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch history' });
    }
};
