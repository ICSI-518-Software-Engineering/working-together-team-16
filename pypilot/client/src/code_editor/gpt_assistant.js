import React, { useState, useEffect, useRef } from 'react';
import { TextField, Box, Paper, IconButton, Typography, CircularProgress, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BotContainer from "../gpt/main"
import { useContainer } from 'unstated-next';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';

const Chatbot = () => {
  const [inputValue, setInputValue] = useState('');
  const botcontainer = useContainer(BotContainer)
  const chatEndRef = useRef(null);

  const handleMessageSend = () => {
    if(inputValue.length){
      botcontainer.addMessage(inputValue);
    }
    setInputValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [botcontainer.messages]);

  const styles = {
    messageContainer: {
      marginBottom: 8,
      padding: '6px 12px',
      borderRadius: 8,
      maxWidth: '95%',
      wordWrap: 'break-word',
      color: "black",
      textAlign : 'start'
    },
    userMessageContainer: {
      backgroundColor: 'green',
      alignSelf: 'flex-end',
      display:'flex',
      justifyContent: 'end'

    },
    botMessageContainer: {
      backgroundColor: '#000000',
      alignSelf: 'flex-start',
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      <Container sx={{background:"black", p:1}}>
        <Typography  sx={{color:'white'}}>
          PyPilot Advanced AI
        </Typography>
      </Container>
      <Paper elevation={3} sx={{ p: 2, height: 450, width:400, overflowY: 'auto', color: 'black' , display:'flex', flexDirection:'column'}}>
        {botcontainer.messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.messageContainer,
              ...(message.role === 'user' ? styles.userMessageContainer : styles.botMessageContainer),
            }}
          >
            <Typography dangerouslySetInnerHTML={{ __html: message.content[0].text.value }} />
          </div>
        ))}
        <div ref={chatEndRef} />
        {botcontainer.isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <CircularProgress />
          </div>
        )}
      </Paper>
      <TextField
      placeholder='type..'
        variant='outlined'
        fullWidth
        disabled={botcontainer.isLoading}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        size='small'
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleMessageSend} disabled={botcontainer.isLoading}>
              <SendIcon />
            </IconButton>
          ),
        }}
        sx={{ backgroundColor:'white' }}
      />
    </Box>
  );
};

export default Chatbot;
