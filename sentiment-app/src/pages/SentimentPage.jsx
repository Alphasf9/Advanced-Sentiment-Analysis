import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SentimentPage() {
    const [tweet, setTweet] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!tweet.trim()) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://advanced-sentiment-analysis-1.onrender.com/api/sentiment/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({ tweet }),
            });

            const data = await response.json();
            setResult(data.data.sentiment);
        } catch (error) {
            setResult('Error analyzing sentiment.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://advanced-sentiment-analysis-1.onrender.com/api/auth/logout', {
                method: 'POST',
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            if (response.ok) {
                localStorage.removeItem('token'); 
                navigate('/login'); 
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            localStorage.removeItem('token'); 
            navigate('/login'); 
        }
    };

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

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    @keyframes glow {
                        0%, 100% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.5); }
                        50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8); }
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                        font-family: 'Poppins', sans-serif;
                    }

                    .sentiment-container {
                        height: 100vh;
                        width: 100vw;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: linear-gradient(45deg, #ec4899, #a855f7, #4f46e5, #ec4899);
                        background-size: 400%;
                        animation: gradientShift 15s ease infinite;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        padding: 2rem;
                    }

                    .main-container {
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        border-radius: 20px;
                        padding: 2rem;
                        width: 100%;
                        max-width: 600px;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                        animation: fadeInUp 1s ease-out forwards;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .header {
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: #fff;
                        text-align: center;
                        margin-bottom: 1.5rem;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                    }

                    .text-area {
                        width: 100%;
                        max-width: 500px;
                        padding: 1rem;
                        border: none;
                        border-radius: 8px;
                        background: rgba(255, 255, 255, 0.9);
                        font-size: 1rem;
                        color: #1f2937;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        resize: none;
                        animation: scaleIn 0.8s ease-out forwards;
                        margin-bottom: 1.5rem;
                    }

                    .text-area:focus {
                        outline: none;
                        background: #fff;
                        box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
                    }

                    .text-area::placeholder {
                        color: #6b7280;
                    }

                    .analyze-btn {
                        width: 100%;
                        max-width: 300px;
                        padding: 0.75rem;
                        background: #a855f7;
                        border: none;
                        border-radius: 8px;
                        color: #fff;
                        font-size: 1.1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        animation: scaleIn 1s ease-out forwards;
                        animation-delay: 0.2s;
                    }

                    .analyze-btn:hover {
                        transform: scale(1.05);
                        background: #9333ea;
                    }

                    .analyze-btn:active {
                        transform: scale(0.95);
                    }

                    .analyze-btn.glow {
                        animation: glow 2s ease-in-out infinite;
                    }

                    .analyze-btn:disabled {
                        background: #6b7280;
                        cursor: not-allowed;
                    }

                    .spinner {
                        display: inline-block;
                        margin-right: 0.5rem;
                        animation: spin 1s linear infinite;
                    }

                    .result-display {
                        margin-top: 1.5rem;
                        padding: 1rem;
                        border-radius: 8px;
                        background: rgba(255, 255, 255, 0.2);
                        backdrop-filter: blur(10px);
                        width: 100%;
                        max-width: 500px;
                        animation: fadeInUp 0.6s ease-out forwards;
                        text-align: center;
                    }

                    .result-display h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-bottom: 0.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .result-display p {
                        font-size: 1rem;
                        color: #fff;
                    }

                    .positive {
                        color: #22c55e;
                    }

                    .negative {
                        color: #f87171;
                    }

                    .button-group {
                        display: flex;
                        gap: 1rem;
                        margin-top: 1.5rem;
                    }

                    .history-btn,
                    .logout-btn {
                        width: 100%;
                        max-width: 200px;
                        padding: 0.75rem;
                        background: transparent;
                        border: 2px solid #a855f7;
                        border-radius: 8px;
                        color: #a855f7;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        animation: scaleIn 1s ease-out forwards;
                    }

                    .history-btn {
                        animation-delay: 0.4s;
                    }

                    .logout-btn {
                        animation-delay: 0.6s;
                    }

                    .history-btn:hover,
                    .logout-btn:hover {
                        transform: scale(1.05);
                        background: #a855f7;
                        color: #fff;
                    }

                    .history-btn:active,
                    .logout-btn:active {
                        transform: scale(0.95);
                    }

                    @media (max-width: 480px) {
                        .main-container {
                            padding: 1.5rem;
                            max-width: 90%;
                        }

                        .header {
                            font-size: 2rem;
                        }

                        .text-area,
                        .analyze-btn,
                        .result-display,
                        .history-btn,
                        .logout-btn {
                            max-width: 100%;
                        }

                        .button-group {
                            flex-direction: column;
                            gap: 0.5rem;
                        }
                    }
                `}
            </style>

            <div className="sentiment-container">
                <div className="main-container">
                    <h1 className="header">Let's Analyze Your Statement</h1>

                    <textarea
                        rows="4"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                        placeholder="Type your sentence here..."
                        className="text-area"
                    />

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="analyze-btn glow"
                    >
                        {loading ? (
                            <span>
                                <span className="spinner">⏳</span>
                                Analyzing...
                            </span>
                        ) : (
                            'Analyze Sentiment'
                        )}
                    </button>

                    <div className="button-group">
                        <button
                            onClick={() => navigate('/sentiment-history')}
                            className="history-btn"
                        >
                            View History
                        </button>

                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    </div>

                    {result && (
                        <div className={`result-display ${result === 'Positive' ? 'positive' : 'negative'}`}>
                            <h2>
                                {result === 'Positive' ? '😊 Positive' : '😞 Negative'}
                            </h2>
                            <p>
                                {result === 'Positive' ? 'This sounds positive!' : result === 'Negative' ? 'This sounds negative.' : result}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SentimentPage;