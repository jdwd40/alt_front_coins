import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Divider, Flex, Badge, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Button, useDisclosure } from '@chakra-ui/react';
import PriceHistoryGraph from '../components/PriceHistoryGraph';
import TransactionModal from '../components/TransactionModal';

const CoinDetailsPage = () => {
  const { coinId } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); 


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

  // wait for coinDetails to be fetched
  if (!coinDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4}>
      {coinDetails && (
        <>
          <Text fontSize="2xl" fontWeight="bold">{coinDetails.name} ({coinDetails.symbol})</Text>
          <Text fontSize="md" color="gray.600">{coinDetails.description}</Text>
          <Divider my={4} />
          <Flex flexDirection="column" gap="2">
            <Text fontSize="xl" fontWeight="bold">Current Price: £{coinDetails.current_price}</Text>
            <Stat>
              <StatLabel>Price Change</StatLabel>
              <Flex alignItems="center">
                <StatArrow type={parsePercentage(coinDetails.percentage5mins) >= 0 ? 'increase' : 'decrease'} />
                <StatNumber fontSize="sm">{coinDetails.percentage5mins}</StatNumber>
              </Flex>
            </Stat>
            <Stat>
              {/* Flex container for Supply and Market Cap */}
              <Flex
                direction={{ base: 'column', sm: 'row' }}  // Adjusted for small to medium screens
                justify="flex-start" // Align items to the start
                gap={4}
              >
                <Box>
                  <StatLabel>Supply</StatLabel>
                  <Text fontSize="sm">{coinDetails.supply}</Text>
                </Box>
                <Box>
                  <StatLabel>Market Cap</StatLabel>
                  <Text fontSize="sm">£{coinDetails.market_cap}</Text>
                </Box>
              </Flex>
              <Divider my={4} />
            </Stat>

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              justify="flex-start"
              gap={4}
            >
              {/* All Time High/Low */}
              <Box>
                <Text fontSize="xs">All Time High: £{coinDetails.allTimeHigh}</Text>
                <Text fontSize="xs">All Time Low: £{coinDetails.allTimeLow}</Text>
              </Box>

              {/* Last 5/10 mins */}
              <Box>
                <Text fontSize="xs">Last 5mins Value: £{coinDetails.last5minsValue}
                  (<span style={{ color: parsePercentage(coinDetails.percentage5mins) >= 0 ? 'green' : 'red' }}>
                    {coinDetails.percentage5mins}
                  </span>)
                </Text>
                <Text fontSize="xs">Last 10mins Value: £{coinDetails.last10minsValue}
                  (<span style={{ color: parsePercentage(coinDetails.percentage10mins) >= 0 ? 'green' : 'red' }}>
                    {coinDetails.percentage10mins}
                  </span>)
                </Text>
                <Button colorScheme="teal" onClick={onOpen}>Buy {coinDetails.name}</Button>
          
              </Box>
            </Flex>

            <Divider my={4} />

            <Text fontSize="xs">Event Type: {coinDetails.eventType}</Text>
            <Badge fontSize="xs" colorScheme={coinDetails.coinEventPositive ? 'green' : 'red'}>
              {coinDetails.eventImpact.toUpperCase()} Impact
            </Badge>
            <Text fontSize="xs">Event Duration: {coinDetails.eventDuration}</Text>
            <Divider my={4} />
            <PriceHistoryGraph coinId={coinDetails.coin_id} />
          </Flex>

          <TransactionModal
            isOpen={isOpen}
            onClose={onClose}
            coin={coinDetails}
            isBuying={true} 
          />
        </>
      )}
    </Box>
  );
};

export default CoinDetailsPage;
