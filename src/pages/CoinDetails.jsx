import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Divider, Flex, Badge } from '@chakra-ui/react';

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

  return (
    <Box p={4}>
      {coinDetails && (
        <>
          <Text fontSize="2xl" fontWeight="bold">{coinDetails.name} ({coinDetails.symbol})</Text>
          <Text fontSize="md" color="gray.600">{coinDetails.description}</Text>
          <Divider my={4} />
          <Flex flexDirection="column" gap="2">
            <Text>Current Price: ${coinDetails.current_price}</Text>
            <Text>Supply: {coinDetails.supply}</Text>
            <Text>Market Cap: ${coinDetails.market_cap}</Text>
            <Text>Date Added: {new Date(coinDetails.date_added).toLocaleDateString()}</Text>
            <Text>All Time High: ${coinDetails.allTimeHigh}</Text>
            <Text>All Time Low: ${coinDetails.allTimeLow}</Text>
            {/* Additional fields */}
            <Text>Last 5mins Value: ${coinDetails.last5minsValue} ({coinDetails.percentage5mins})</Text>
            <Text>Last 10mins Value: ${coinDetails.last10minsValue} ({coinDetails.percentage10mins})</Text>
            {/* ... and so on */}
            <Text>Event Type: {coinDetails.eventType}</Text>
            <Badge colorScheme={coinDetails.coinEventPositive ? 'green' : 'red'}>
              {coinDetails.eventImpact.toUpperCase()} Impact
            </Badge>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CoinDetailsPage;
