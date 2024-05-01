import React, { useState } from 'react';
import { Flex, Box, Text, IconButton, Button, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaMoon, FaSun, FaUserPlus, FaBriefcase } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import SignInModal from './SignInModal'; // Import SignInModal
import RegisterModal from './RegisterModal'; // Import RegisterModal

const Header = () => {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  
  // State for modals
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  // Open and close functions for SignIn Modal
  const openSignInModal = () => setSignInOpen(true);
  const closeSignInModal = () => setSignInOpen(false);

  // Open and close functions for Register Modal
  const openRegisterModal = () => setRegisterOpen(true);
  const closeRegisterModal = () => setRegisterOpen(false);

  return (
    <Flex as="header" align="center" justify="space-between" padding="0.5rem" bg="blue.500" color="white">
      <RouterLink to="/">
        <Text fontSize="lg" fontWeight="bold">JDC</Text>
      </RouterLink>
      <IconButton 
        size="sm"
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode} 
        aria-label="Toggle theme" 
        mr="2"
      />
      <Box display="flex" alignItems="center">
        {user ? (
          <>
            <Text fontSize="sm" mr="2">Welcome, {user.username}!</Text>
            <RouterLink to="/portfolio">
              <IconButton icon={<FaBriefcase />} aria-label="Portfolio" mr="2" />
            </RouterLink>
            <IconButton size="sm" icon={<FaSignOutAlt />} onClick={logout} aria-label="Sign out" />
          </>
        ) : (
          <>
            <Button size="sm" leftIcon={<FaSignInAlt />} onClick={openSignInModal} colorScheme="teal" variant="outline" mr="2">
              Sign In
            </Button>
            <Button size="sm" leftIcon={<FaUserPlus />} onClick={openRegisterModal} colorScheme="teal" variant="solid">
              Register
            </Button>
          </>
        )}
      </Box>
      {/* Modals */}
      <SignInModal isOpen={isSignInOpen} onClose={closeSignInModal} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegisterModal} />
    </Flex>
  );
};

export default Header;
