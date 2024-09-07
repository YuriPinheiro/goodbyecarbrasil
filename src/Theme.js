import { createTheme } from '@mui/material/styles';

// Definindo o tema com as cores personalizadas
const theme = createTheme({
  palette: {
    primary: {
      main: '#18E8DB',
    },
    secondary: {
      main: '#F49841',
    },
    background: {
      default: '#FFFFFF',  // Cor de fundo padrão
      paper: '#282828',    // Cor de fundo alternativa (usada em cards, modais, etc.)
    },
    text: {
      primary: '#282828',  // Cor do texto principal (escuro)
      secondary: '#FFFFFF' // Cor do texto secundário (claro)
    },
  },
  colors: {
    primary: '#18E8DB',
    secondary: '#F49841',
    dark: '#282828',
    light: '#FFFFFF'
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;
