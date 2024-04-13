import React from 'react';
import { Flex, Box, Text, IconButton, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ onSignInClick, user, onSignOutClick }) => {
  const { colorMode, toggleColorMode } = useColorMode();

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
            <Text fontSize="sm" mr="2">Welcome, {user.username}</Text>
            <IconButton size="sm" icon={<FaSignOutAlt />} onClick={onSignOutClick} aria-label="Sign out" />
          </>
        ) : (
            <IconButton size="sm" icon={<FaSignInAlt />} onClick={onSignInClick} aria-label="Sign in" />
        )}
      </Box>
    </Flex>
  );
};

export default Header;
