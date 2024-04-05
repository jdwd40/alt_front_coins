import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';

const SignInModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ username: '', email: '', password: '' });
  const toast = useToast();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      onLoginSuccess(data); // Call the function passed in props on successful login
      toast({
        title: 'Login successful',
        description: `Welcome back, ${data.username}!`,
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      onClose();  // Close the modal on successful login
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input 
              name="username" 
              value={loginData.username} 
              onChange={handleChange} 
              placeholder="Enter your username" 
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input 
              name="email" 
              value={loginData.email} 
              type="email" 
              onChange={handleChange} 
              placeholder="Enter your email" 
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input 
              name="password" 
              value={loginData.password} 
              type="password" 
              onChange={handleChange} 
              placeholder="Enter your password" 
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" type="submit" mr={3}>
            Log In
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
