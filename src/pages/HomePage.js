import React from 'react';
import Grid from "@mui/material/Grid2";
import HeroSection from '../sections/HeroSection';
import StepsSection from '../sections/StepsSection.js';
import AdvantageSection from '../sections/AdvantageSection.js';
import RetailerSection from '../sections/RetailerSection.js';
import AboutSection from '../sections/AboutSection.js';
import CommentsSection from '../sections/CommentsSection.js';
import CallToActionSection from '../sections/CallToActionSection.js';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/system';

// Estilo personalizado para o botão do WhatsApp
const WhatsAppFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: '#25D366',
  color: 'white',
  '&:hover': {
    backgroundColor: '#128C7E',
  },
  zIndex: 1000,
}));

const HomePage = () => {
  const whatsappNumber = '5554981702266'; // Substitua pelo número correto
  const whatsappMessage = 'Olá, gostaria de mais informações!'; // Mensagem padrão

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <Grid>
      <Header />
      <HeroSection />
      <StepsSection />
      <AdvantageSection />
      <CommentsSection />
      <RetailerSection />
      <AboutSection />
      <CallToActionSection />
      <Footer />

      {/* Botão flutuante do WhatsApp */}
      <WhatsAppFab 
        color="primary" 
        aria-label="WhatsApp"
        onClick={handleWhatsAppClick}
      >
        <WhatsAppIcon fontSize="large" />
      </WhatsAppFab>
    </Grid>
  );
};

export default HomePage;