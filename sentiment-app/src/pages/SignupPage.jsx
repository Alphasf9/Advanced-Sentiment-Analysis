import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/user.context';

const SignupPage = () => {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://advanced-sentiment-analysis-1.onrender.com/api/auth/register', formData);
      if (response.data) {
        setSuccess('User registered successfully! You can now login.');
        setUser({ username: formData.username });login
        setFormData({ username: '', password: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
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

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 10px rgba(249, 115, 22, 0.5); }
            50% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.8); }
          }

          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
            font-family: 'Poppins', sans-serif;
          }

          .signup-container {
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(45deg, #f97316, #facc15, #a855f7, #f97316);
            background-size: 400%;
            animation: gradientShift 15s ease infinite;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }

          .signup-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            animation: fadeInUp 1s ease-out forwards;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .signup-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #fff;
            text-align: center;
            margin-bottom: 1.5rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          .error-message {
            color: #f87171;
            text-align: center;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            animation: slideInLeft 0.5s ease-out forwards;
            background: rgba(255, 75, 75, 0.1);
            padding: 0.5rem;
            border-radius: 8px;
            width: 100%;
            max-width: 300px;
          }

          .success-message {
            color: #22c55e;
            text-align: center;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            animation: slideInLeft 0.5s ease-out forwards;
            background: rgba(34, 197, 94, 0.1);
            padding: 0.5rem;
            border-radius: 8px;
            width: 100%;
            max-width: 300px;
          }

          .form-group {
            position: relative;
            margin-bottom: 1.5rem;
            width: 100%;
            max-width: 300px;
            animation: scaleIn 0.8s ease-out forwards;
          }

          .form-group input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            color: #1f2937;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .form-group input:focus {
            outline: none;
            background: #fff;
            box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.3);
          }

          .form-group label {
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
            color: #6b7280;
            font-size: 1rem;
            pointer-events: none;
            transition: all 0.3s ease;
          }

          .form-group input:focus + label,
          .form-group input:not(:placeholder-shown) + label {
            top: -0.5rem;
            left: 0.75rem;
            font-size: 0.75rem;
            color: #f97316;
            background: #fff;
            padding: 0 0.25rem;
          }

          .signup-button {
            width: 100%;
            max-width: 300px;
            padding: 0.75rem;
            background: #f97316;
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

          .signup-button:hover {
            transform: scale(1.05);
            background: #ea580c;
          }

          .signup-button:active {
            transform: scale(0.95);
          }

          .signup-button.glow {
            animation: glow 2s ease-in-out infinite;
          }

          .login-redirect-button {
            width: 100%;
            max-width: 300px;
            padding: 0.75rem;
            background: transparent;
            border: 2px solid #f97316;
            border-radius: 8px;
            color: #f97316;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: scaleIn 1s ease-out forwards;
            animation-delay: 0.4s;
            margin-top: 1rem;
          }

          .login-redirect-button:hover {
            transform: scale(1.05);
            background: #f97316;
            color: #fff;
          }

          .login-redirect-button:active {
            transform: scale(0.95);
          }

          @media (max-width: 480px) {
            .signup-card {
              padding: 1.5rem;
              max-width: 90%;
            }

            .signup-title {
              font-size: 2rem;
            }

            .form-group,
            .signup-button,
            .login-redirect-button {
              max-width: 100%;
            }
          }
        `}
      </style>

      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Sign Up</h2>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder=" "
                value={formData.username}
                onChange={handleChange}
                required
                id="username"
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                id="password"
              />
              <label htmlFor="password">Password</label>
            </div>

            <button type="submit" className="signup-button glow">
              Sign Up
            </button>

            <button
              type="button"
              className="login-redirect-button"
              onClick={handleLoginRedirect}
            >
              Already Registered? Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;