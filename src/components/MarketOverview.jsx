import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Stat, StatLabel, StatNumber, StatGroup, List, ListItem } from '@chakra-ui/react';

const MarketOverview = () => {
    const [marketData, setMarketData] = useState(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await fetch('http://localhost:9001/api/stats');
                const data = await response.json();
                setMarketData(data);
            } catch (error) {
                console.error('Error fetching market data:', error);
            }
        };

        fetchMarketData();
    }, []);

    if (!marketData) {
        return <Box>Loading market data...</Box>;
    }

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Text fontSize="xl" mb={4}>Market Overview</Text>
            <StatGroup>
                <Stat>
                    <StatLabel>Total Market Cap</StatLabel>
                    <StatNumber>${marketData.marketValue}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel fontSize="sm">Last 5 Mins Market Value</StatLabel>
                    <StatNumber fontSize="sm" >${marketData.last5minsMarketValue} ({marketData.percentage5mins})</StatNumber>
                </Stat>
                {/* Add more stats as needed */}
            </StatGroup>
            <Text mt={4} fontSize="md" fontWeight="bold">Top 3 Coins:</Text>
            <List spacing={2}>
                {marketData.top3Coins.slice(0, 3).map((coin, index) => (
                    <ListItem key={index}>{coin.name} - ${coin.price}</ListItem>
                ))}
            </List>
        </Box>
    );
};

export default MarketOverview;
