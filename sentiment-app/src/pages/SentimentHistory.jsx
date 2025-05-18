import React, { useEffect, useState } from 'react';

function SentimentHistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://advanced-sentiment-analysis-1.onrender.com/sentiment/history', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    setHistory(data.data);
                } else {
                    setError(data.message || 'Failed to fetch history.');
                }
            } catch (err) {
                setError('Something went wrong while fetching history.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <>
            <style>
                {`
                    @keyframes gradientShift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes scaleIn {
                        from {
                            transform: scale(0.9);
                            opacity: 0;
                        }
                        to {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }

                    @keyframes slideInLeft {
                        from {
                            opacity: 0;
                            transform: translateX(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                        font-family: 'Poppins', sans-serif;
                    }

                    .history-container {
                        height: 100vh;
                        width: 100vw;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background: linear-gradient(45deg, #2dd4bf, #22d3ee, #3b82f6, #2dd4bf);
                        background-size: 400%;
                        animation: gradientShift 15s ease infinite;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        overflow-y: auto;
                        padding: 2rem;
                    }

                    .history-title {
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: #fff;
                        text-align: center;
                        margin-bottom: 2rem;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                        animation: fadeInUp 1s ease-out forwards;
                    }

                    .loading-spinner {
                        font-size: 1.5rem;
                        color: #fff;
                        text-align: center;
                        animation: spin 1.5s linear infinite;
                        margin: 2rem 0;
                    }

                    .error-message {
                        color: #f87171;
                        text-align: center;
                        margin-bottom: 1rem;
                        font-size: 1.1rem;
                        animation: slideInLeft 0.5s ease-out forwards;
                        background: rgba(255, 75, 75, 0.1);
                        padding: 0.75rem;
                        border-radius: 8px;
                        width: 100%;
                        max-width: 600px;
                    }

                    .no-history-message {
                        color: #d1d5db;
                        text-align: center;
                        font-size: 1.2rem;
                        animation: fadeInUp 1s ease-out forwards;
                    }

                    .history-list {
                        width: 100%;
                        max-width: 800px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        space-y: 1rem;
                    }

                    .history-card {
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        border-radius: 12px;
                        padding: 1.5rem;
                        width: 100%;
                        max-width: 600px;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                        animation: scaleIn 0.8s ease-out forwards;
                        margin-bottom: 1rem;
                        transition: transform 0.3s ease;
                    }

                    .history-card:hover {
                        transform: translateY(-5px);
                    }

                    .tweet-text {
                        font-size: 1.1rem;
                        color: #fff;
                        margin-bottom: 0.5rem;
                        display: flex;
                        align-items: center;
                    }

                    .tweet-text span {
                        font-weight: 500;
                        margin-left: 0.5rem;
                    }

                    .sentiment-label {
                        font-size: 1rem;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        margin-bottom: 0.5rem;
                    }

                    .sentiment-label.positive {
                        color: #22c55e;
                    }

                    .sentiment-label.negative {
                        color: #f87171;
                    }

                    .sentiment-label span {
                        margin-left: 0.5rem;
                    }

                    .timestamp {
                        font-size: 0.9rem;
                        color: #d1d5db;
                    }

                    @media (max-width: 480px) {
                        .history-title {
                            font-size: 2rem;
                        }

                        .history-card {
                            padding: 1rem;
                            max-width: 90%;
                        }

                        .tweet-text,
                        .sentiment-label,
                        .timestamp {
                            font-size: 0.9rem;
                        }
                    }
                `}
            </style>

            <div className="history-container">
                <h1 className="history-title">Your Sentiment History</h1>

                {loading ? (
                    <div className="loading-spinner">⏳</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : history.length === 0 ? (
                    <div className="no-history-message">No sentiment history found.</div>
                ) : (
                    <div className="history-list">
                        {history.map((entry, index) => (
                            <div
                                key={entry._id || index}
                                className="history-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <p className="tweet-text">
                                    📝 <span>{entry.tweet}</span>
                                </p>
                                <p
                                    className={`sentiment-label ${
                                        entry.sentiment === 'Positive' ? 'positive' : 'negative'
                                    }`}
                                >
                                    {entry.sentiment === 'Positive' ? '😊' : '😞'}
                                    <span>{entry.sentiment}</span>
                                </p>
                                <p className="timestamp">
                                    Analyzed on {new Date(entry.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SentimentHistoryPage;