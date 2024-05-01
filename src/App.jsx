import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import CoinDetails from './pages/CoinDetails';
import SignInModal from './components/SignInModal';
import RegisterModal from './components/RegisterModal'; // Ensure this is imported
import BottomNavBar from './components/BottomBarNav';

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignInClick = () => {
    setIsSignInOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignInOpen(false);
    setIsRegisterOpen(false);
  };

  const handleSignOutClick = () => {
    setUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    handleCloseModal();
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    handleCloseModal();
  };

  return (
    <Router>
      <Header 
        onSignInClick={handleSignInClick}
        onRegisterClick={handleRegisterClick}
        user={user}
        onSignOutClick={handleSignOutClick} 
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CoinDetails/:coinId" element={<CoinDetails />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={handleCloseModal} 
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal
        isOpen={isRegisterOpen} 
        onClose={handleCloseModal} 
        onRegisterSuccess={handleRegisterSuccess}
      />
      <BottomNavBar />
      <Footer />
    </Router>
  );
}

export default App;
