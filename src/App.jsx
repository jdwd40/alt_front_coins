import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import CoinDetails from './pages/CoinDetails';
import SignInModal from './components/SignInModal';
import { useState } from 'react';


function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignInClick = () => {
    setIsSignInOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignInOpen(false);
  };

  const handleSignOutClick = () => {
    setUser(null); 
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    console.log(userData);
    // Additional logic after successful login
  };

  return (
    <Router>
      <Header onSignInClick={handleSignInClick}
        user={user}
        onSignOutClick={handleSignOutClick} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CoinDetails/:coinId" element={<CoinDetails />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
      <SignInModal isOpen={isSignInOpen} onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess}/>
      <Footer />
    </Router>
  );
}

export default App;

