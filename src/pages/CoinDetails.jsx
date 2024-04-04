import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Divider, Flex, Badge } from '@chakra-ui/react';
import PriceHistoryGraph from '../components/PriceHistoryGraph';

const CoinDetailsPage = () => {
  const { coinId } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9001/api/coins/${coinId}`);
        const data = await response.json();
        setCoinDetails(data);
      } catch (error) {
        console.error('Error fetching coin details:', error);
      }
    };

    fetchCoinDetails();
  }, [coinId]);

  const parsePercentage = (percentageString) => {
    return parseFloat(percentageString.replace('%', ''));
  };

  return (
    <Box p={4}>
      {coinDetails && (
        <>
          <Text fontSize="2xl" fontWeight="bold">{coinDetails.name} ({coinDetails.symbol})</Text>
          <Text fontSize="md" color="gray.600">{coinDetails.description}</Text>
          <Divider my={4} />
          <Flex flexDirection="column" gap="2">
            <Text fontSize="xl" fontWeight="bold">Current Price: £{coinDetails.current_price}</Text>
            <Text fontSize="sm">Supply: {coinDetails.supply}</Text>
            <Text fontSize="sm">Market Cap: £{coinDetails.market_cap}</Text>
            <Text>Date Added: {new Date(coinDetails.date_added).toLocaleDateString()}</Text>
            <Text fontSize="sm">All Time High: £{coinDetails.allTimeHigh}</Text>
            <Text fontSize="sm">All Time Low: £{coinDetails.allTimeLow}</Text>

            <Text>Last 5mins Value: £{coinDetails.last5minsValue} (<span style={{ color: parsePercentage(coinDetails.percentage5mins) >= 0 ? 'green' : 'red' }}>{coinDetails.percentage5mins}</span>)</Text>
            <Text>Last 10mins Value: £{coinDetails.last10minsValue} (<span style={{ color: parsePercentage(coinDetails.percentage10mins) >= 0 ? 'green' : 'red' }}>{coinDetails.percentage10mins}</span>)</Text>
            {/* ... and so on */}
            <Text fontSize="sm">Event Type: {coinDetails.eventType}</Text>
            <Badge colorScheme={coinDetails.coinEventPositive ? 'green' : 'red'}>
              {coinDetails.eventImpact.toUpperCase()} Impact
            </Badge>
            <Text fontSize="sm">Event Duration: {coinDetails.eventDuration}</Text>
            <PriceHistoryGraph coinId={coinDetails.coin_id} />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CoinDetailsPage;
