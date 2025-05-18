import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/user.context.jsx'  // adjust path if needed

const Welcome = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserDataContext)
  const token = localStorage.getItem('token')

  useEffect(() => {
    // If user logged in (user object exists or token exists), redirect to /sentiment
    if ((user && user.username) || token) {
      navigate('/sentiment')
    }
  }, [user, token, navigate])

  const handleStart = () => {
    navigate('/signup')
  }

  return (
    <>
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.5); }
            50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8); }
          }

          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out forwards;
          }

          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }

          .hover-scale:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease;
          }

          .bg-image {
            background-image: url('/sentiment.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 100vh;
            min-width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
          }

          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
          }

          .content-container {
            position: absolute;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            max-width: 600px;
            width: 90%;
            text-align: center;
            padding-top: 2vh;
          }

          .title {
            margin-bottom: 1rem;
            font-size: clamp(2.5rem, 5vw, 3.5rem);
          }

          .subtitle {
            margin-bottom: 1.5rem;
            font-size: clamp(1rem, 2vw, 1.5rem);
          }

          .start-button {
            padding: 0.75rem 2rem;
            font-size: clamp(1rem, 2vw, 1.25rem);
          }

          @media (max-height: 600px) {
            .content-container {
              top: 2%;
            }
            .title {
              margin-bottom: 0.5rem;
            }
            .subtitle {
              margin-bottom: 1rem;
            }
          }
        `}
      </style>
      <div className="bg-image">
        <div className="overlay"></div>
        <div className="content-container">
          <h1 className="font-extrabold text-white drop-shadow-lg animate-fade-in-down title">
            Sentiment Analysis
          </h1>
          <p className="text-gray-200 animate-fade-in-down subtitle" style={{ animationDelay: '0.2s' }}>
            Uncover the emotions behind words with our cutting-edge sentiment detection tool.
          </p>
          <button
            onClick={handleStart}
            className="bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition duration-300 shadow-lg animate-glow hover-scale animate-fade-in-down start-button"
            style={{ animationDelay: '0.4s' }}
          >
            Let's Get Started
          </button>
        </div>
      </div>
    </>
  )
}

export default Welcome
