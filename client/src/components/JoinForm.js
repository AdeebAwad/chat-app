import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import axios from './axios';

const JoinForm = ({ socket, showChatRoom }) => {
  const [username, setUsername] = useState('');
  const toast = useToast();
  const joinRoom = async () => {
    if (username !== '') {
      const response = await axios.get(`checkUsername/${username}`);
      if (response.data) {
        toast({
          title: 'Error!',
          description: 'User Name Already Exists..',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } else {
        socket.emit('joinRoom', username);
        showChatRoom(username);
      }
    }
  };

  return (
    <Container>
      <Box bg={'grey.100'}>
        <Heading color={'red.400'} textAlign={'center'}>
          Join A Chat
        </Heading>
        <Flex p={6} justifyContent={'center'}>
          <VStack spacing={3}>
            <Text>Enter Username</Text>
            <Input
              type="text"
              placeholder="John..."
              onChange={event => {
                setUsername(event.target.value);
              }}
            />

            <Button onClick={joinRoom}>Join A Room</Button>
          </VStack>
        </Flex>
      </Box>
    </Container>
  );
};

export default JoinForm;
