import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa os estilos do AOS
import RegisterPage from './pages/auth/RegisterPage';
import RecoverPasswordPage from './pages/auth/RecoverPasswordPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './routes/PrivateRoute';
import TermsAndConditions from './pages/TermsAndConditions';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação em milissegundos
      easing: 'ease-in-out', // Efeito de animação
      once: true, // Se `true`, a animação ocorre apenas uma vez
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/recuperar-senha" element={<RecoverPasswordPage />} />
          <Route path="/termos-e-condicoes" element={<TermsAndConditions />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
