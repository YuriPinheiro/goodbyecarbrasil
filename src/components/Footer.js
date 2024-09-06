import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 4 }}>
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          © 2024 GoodByeCar. Todos os direitos reservados.
        </Typography>
        <Typography variant="body2" align="center">
          Desenvolvido por Seu Nome
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
