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

    const parsePercentage = (percentageString) => {
        return parseFloat(percentageString.replace('%', ''));
    };

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Text fontSize="xl" mb={4}>Market Overview</Text>
            <Text fontSize="sm" color="gray.600">Last updated: {marketData.lastUpdated}</Text>
            <StatGroup>
                <Stat>
                    <StatLabel>Total Market Cap</StatLabel>
                    <StatNumber>£{marketData.marketValue}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel fontSize="sm">Last 5 Mins</StatLabel>
                    <StatNumber fontSize="sm">£{marketData.last5minsMarketValue}</StatNumber>
                    <StatNumber fontSize="sm" style={{ color: parsePercentage(marketData.percentage5mins) >= 0 ? 'green' : 'red' }}>
                        ({marketData.percentage5mins}%)
                    </StatNumber>
                </Stat>
            </StatGroup>
            <Text mt={4} fontSize="md" fontWeight="bold">Top 3 Coins:</Text>
            <List spacing={2}>
                {marketData.top3Coins.slice(0, 3).map((coin, index) => (
                    <ListItem key={index}>{coin.name} - £{coin.price}</ListItem>
                ))}
            </List>
            <Text mt={4} fontSize="md" fontWeight="bold">Event Info:</Text>
            <Text fontSize="sm">Type: {marketData.event.type}</Text>
            <Text fontSize="sm">Start Time: {new Date(marketData.event.start_time).toLocaleTimeString()}</Text>
            <Text fontSize="sm">End Time: {new Date(marketData.event.end_time).toLocaleTimeString()}</Text>
            <Text fontSize="sm">Time Left: {Math.round(marketData.event.time_left)} mins</Text>
        </Box>
    );
};

export default MarketOverview;
