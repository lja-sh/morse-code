import React from 'react';
import { Container, Typography } from '@mui/material';
import AlphabetsTable from '../components/AlphabetsTable';

const Alphabets = () => (
  <div>
    <Container sx={{ mt: 4, mb: 8 }}>

      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Morse Code Alphabets
      </Typography>

      <AlphabetsTable />

    </Container>
  </div>
);

export default Alphabets;