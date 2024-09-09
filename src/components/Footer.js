import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', color: 'white', py: 3 }}>
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          © 2024 GoodByeCar. Todos os direitos reservados.
        </Typography>
        <Typography variant="body2" align="center">
          Desenvolvido por Yuri Bernardi
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
