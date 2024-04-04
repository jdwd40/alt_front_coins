import React from 'react';
import { Box, Flex, Text, Button, useColorMode } from '@chakra-ui/react';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode(); // For theme toggling

    return (
        <Flex as="header" align="center" justify="space-between" padding="1.5rem" bg="blue.500" color="white">
            <Text fontSize="xl" fontWeight="bold">JDC</Text>
            <Box>
                <Button mr="4" onClick={toggleColorMode}>
                    Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
                <Button>Sign In</Button>
            </Box>
        </Flex>
    );
};

export default Header;