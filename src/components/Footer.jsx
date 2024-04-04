import React from 'react';
import { Box, Text, Link, Flex, Spacer } from '@chakra-ui/react';

const Footer = () => {
    return (
      <Flex as="footer" align="center" justify="center" padding="1.5rem" bg="blue.500" color="white">
        <Text fontSize="sm">
          © {new Date().getFullYear()} JDCoinsApp. All Rights Reserved.
        </Text>
        <Spacer />
        <Text fontSize="sm">
          <Link href="/privacy" color="whiteAlpha.800">Privacy Policy</Link> | 
          <Link href="/terms" color="whiteAlpha.800"> Terms of Service</Link>
        </Text>
      </Flex>
    );
  };

export default Footer;
  