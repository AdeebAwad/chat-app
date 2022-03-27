import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  VStack,
  Button,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';

const ChatRoom = ({ socket, username }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('sendMessage', messageData);
      setMessageList(list => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', data => {
      setMessageList(list => [...list, data]);
    });
  }, [socket]);

  return (
    <Container>
      <Box m={10} borderRadius="lg" bg={'gray.100'}>
        <Box textAlign={'center'}>
          <Heading color={'teal.300'}>Live Chat</Heading>
        </Box>
        <VStack p={2} justifyContent={'flex-start'}>
          {messageList.map((messageContent, i) => {
            return (
              <Box
                key={i}
                //  border="1px"
                borderRadius="2em"
                bg={
                  messageContent.author === username
                    ? 'green.100'
                    : 'yellow.100'
                }
                alignSelf={
                  messageContent.author === username ? 'flex-start' : 'flex-end'
                }
                w={'10em'}
                h={'4em'}
                pl={5}
                pt={1}
              >
                <Text fontSize="0.6em">{messageContent.author}</Text>
                <Text fontWeight={'400'}>{messageContent.message}</Text>
                <Text
                  pr={5}
                  textAlign={'right'}
                  fontSize="0.6em"
                  color={'gray.500'}
                >
                  {messageContent.time}
                </Text>
              </Box>
            );
          })}
        </VStack>
        <Box p={2}>
          <InputGroup>
            <Input
              borderRadius={'xl'}
              bg="white"
              type="text"
              value={currentMessage}
              placeholder="Message..."
              onChange={event => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={event => {
                event.key === 'Enter' && sendMessage();
              }}
            />
            <InputRightAddon
              bg={'white'}
              as={Button}
              _hover={{ textColor: 'green', bg: 'white' }}
              onClick={sendMessage}
            >
              Send
            </InputRightAddon>
          </InputGroup>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatRoom;
