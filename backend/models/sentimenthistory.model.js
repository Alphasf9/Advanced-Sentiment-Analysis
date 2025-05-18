import mongoose from "mongoose";

const SentimentHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tweet: {
        type: String,
        trim: true
    },
    sentiment: {
        type: String,
        enum: ['Positive', 'Negative'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

SentimentHistorySchema.index({ user: 1, createdAt: -1 })

export const sentimentHistory = mongoose.model('SentimentHistory', SentimentHistorySchema);