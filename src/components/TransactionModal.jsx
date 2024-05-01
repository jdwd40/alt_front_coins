import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Text,
  useToast
} from '@chakra-ui/react';

function TransactionModal({ isOpen, onClose, coin, isBuying, userId }) {
    const [amount, setAmount] = useState('');
    const [userFunds, setUserFunds] = useState(0);
    const [coinPrice, setCoinPrice] = useState(0);
    const toast = useToast();

    // Fetch user funds and coin price
    useEffect(() => {
        if (!isOpen) return;

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:9001/api/users/${userId}`);
                const userData = await response.json();
                setUserFunds(userData.funds);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchCoinData = async () => {
            try {
                const response = await fetch(`http://localhost:9001/api/coins/${coin.id}`);
                const coinData = await response.json();
                setCoinPrice(coinData.current_price);
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };

        fetchUserData();
        fetchCoinData();
    }, [isOpen, userId, coin.id]);

    const transactionType = isBuying ? 'buy' : 'sell';

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:9001/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    coin_id: coin.id,
                    type: transactionType,
                    amount: parseFloat(amount)
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Transaction failed.');

            toast({
                title: "Transaction Successful",
                description: data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: "Transaction Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // Calculate the cost based on the input amount
    const transactionCost = amount * coinPrice;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} {coin.name} @ {coin.current_price}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel htmlFor='amount'>{`Amount of ${coin.symbol} to ${transactionType}`}</FormLabel>
                        <NumberInput min={0} onChange={valueString => setAmount(valueString)}>
                            <NumberInputField id='amount' value={amount} />
                        </NumberInput>
                        <Text mt={2}>Available Funds: £{userFunds}</Text>
                        <Text mt={2}>Transaction Cost: £{transactionCost}</Text>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default TransactionModal;
