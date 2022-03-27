import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import JoinForm from './components/JoinForm';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import ChatRoom from './components/ChatRoom';

function App() {
  const [socket, setSocket] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [myUsername, setMyUsername] = useState('');

  const chatRoomHandler = username => {
    setShowChat(true);
    setMyUsername(username);
  };

  useEffect(() => {
    const newSocket = io(`http://localhost:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <ChakraProvider theme={theme}>
      {!showChat ? (
        <JoinForm socket={socket} showChatRoom={chatRoomHandler} />
      ) : (
        <ChatRoom socket={socket} username={myUsername} />
      )}
    </ChakraProvider>
  );
}

export default App;
