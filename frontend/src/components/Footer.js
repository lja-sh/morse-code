import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => (
  <footer>
    <Container maxWidth="lg" sx={{mb:3}}>
      <Typography variant="body2" color="textSecondary" align="center">
        © 2024 Morse Code Education
      </Typography>
    </Container>
  </footer>
);

export default Footer;