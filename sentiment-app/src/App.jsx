import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './pages/introPage'
import SentimentPage from './pages/SentimentPage'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SentimentHistoryPage from './pages/SentimentHistory';
import UserLogout from './pages/UserLogout';
import UserProtectWrapper from './ProtectedRoutes/UserProtectWrapper';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={
          <Welcome />
        } />
        <Route path='/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        <Route path='/sentiment-history' element={
          <UserProtectWrapper>
            <SentimentHistoryPage />
          </UserProtectWrapper>
        } />
        <Route path='/sentiment' element={
          <UserProtectWrapper>
            <SentimentPage />
          </UserProtectWrapper>
        } />
      </Routes>
    </Router>
  )
}

export default App
