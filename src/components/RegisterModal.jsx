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

const SignInModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      toast({
        title: 'Registration successful',
        description: `Welcome, ${data.username}!`,
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      onClose();  // Close the modal on successful registration
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
            <Input name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} type="email" onChange={handleChange} placeholder="Enter your email" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input name="password" value={formData.password} type="password" onChange={handleChange} placeholder="Enter your password" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" type="submit" mr={3}>
            Register
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
