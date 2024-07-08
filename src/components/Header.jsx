import React from 'react';
import { Flex, Box, Text, IconButton, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ onSignInClick, user, onSignOutClick }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as="header" align="center" justify="space-between" padding="0.5rem" bg="blue.500" color="white">
      <RouterLink to="/">
        <Text fontSize="xl" fontWeight="bold">JDC</Text>
      </RouterLink>
      <Box display="flex" alignItems="center">
        {user ? (
          <>
            <Text mr="2">Welcome, {user.username}</Text>
            <IconButton 
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} 
              onClick={toggleColorMode} 
              aria-label="Toggle theme" 
              mr="2"
            />
            <IconButton icon={<FaSignOutAlt />} onClick={onSignOutClick} aria-label="Sign out" />
          </>
        ) : (
          <>
            <Text mr="2">Welcome, Guest</Text>
            <IconButton 
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} 
              onClick={toggleColorMode} 
              aria-label="Toggle theme" 
              mr="2"
            />
            <IconButton icon={<FaSignInAlt />} onClick={onSignInClick} aria-label="Sign in" />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
