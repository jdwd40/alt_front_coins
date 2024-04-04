import React from 'react';
import { Box, Image, Text, Flex, Spacer, Button } from '@chakra-ui/react';

const CoinCard = ({ coinData, onCoinSelect }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
            <Flex align="center">
                <Image borderRadius="full" boxSize="50px" src={coinData.imageUrl || 'default_image_path'} alt={coinData.name} mr={4} />
                <Box>
                    <Text fontSize="xl">{coinData.name}</Text>
                    <Text>Current Price: ${coinData.current_price}</Text>
                </Box>
                <Spacer />
                <Button colorScheme="blue" onClick={() => onCoinSelect(coinData.coin_id)}>Details</Button>
            </Flex>
        </Box>
    );
};

export default CoinCard;
