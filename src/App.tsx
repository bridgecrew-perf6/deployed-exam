import React from 'react';
import {Container, Box, Typography} from '@mui/material';
import MaterialList from './MaterialList';
import './App.css';

function App() {
  return (
    <Container maxWidth="lg">
      <Box my={12}>
        <MaterialList />
      </Box>
    </Container>
  );
}

export default App;
