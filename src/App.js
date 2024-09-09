import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa os estilos do AOS


const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação em milissegundos
      easing: 'ease-in-out', // Efeito de animação
      once: true, // Se `true`, a animação ocorre apenas uma vez
    });
  }, []);


  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <HomePage />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
