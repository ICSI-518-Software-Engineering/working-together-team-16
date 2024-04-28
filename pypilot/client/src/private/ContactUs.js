import React from 'react';
import Typography from '@mui/material/Typography';
import Header from '../Componnets/Header';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

const ContactDescription = () => {
  return (
    <div>
        <Header/>
        <Container maxWidth="md" >
       <Card sx={{mt:10,width:700,alignItems:"start",p:2,justifyContent:"start",ml:5}}>
      <Typography  sx={{textAlign:"start"}} variant="body1" color="textPrimary">
        Welcome to our contact us page! If you have any questions, concerns, or suggestions regarding our website, we would love to hear from you. Feel free to reach out to us
      </Typography>
      <Typography sx={{textAlign:"start",mt:2}} variant="body1" color="textPrimary">
        <strong>Email:</strong> Drop us an email at <a href="mailto:pypilot5@gmail.com">pypilot5@gmail.com</a>.
      </Typography>
      
      <Typography sx={{textAlign:"start",mt:2}}  variant="body1" color="textPrimary">
        We value your feedback and suggestions as they help us improve and tailor our website to better serve you. Thank you for choosing us!
      </Typography>
      </Card> 
      </Container>
    </div>
  );
};

export default ContactDescription;
