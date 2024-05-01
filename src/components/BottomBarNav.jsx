import React from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FaHome, FaWallet, FaChartLine, FaExchangeAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BottomNavBar = () => {
    const navigate = useNavigate();

    return (
        <Box position="fixed" bottom="0" left="0" right="0" bg="blue.500" p="2" shadow="sm">
            <Flex justify="space-around" color="white">
                <IconButton
                    icon={<FaHome />}
                    onClick={() => navigate('/')}
                    aria-label="Home"
                    variant="ghost"
                />
                <IconButton
                    icon={<FaWallet />}
                    onClick={() => navigate('/portfolio')}
                    aria-label="Portfolio"
                    variant="ghost"
                />
                <IconButton
                    icon={<FaExchangeAlt />}
                    onClick={() => navigate('/trade')}
                    aria-label="Trade"
                    variant="solid"
                    colorScheme="teal"
                />
                <IconButton
                    icon={<FaChartLine />}
                    onClick={() => navigate('/')}
                    aria-label="Market"
                    variant="ghost"
                />
            </Flex>
        </Box>
    );
};

export default BottomNavBar;
