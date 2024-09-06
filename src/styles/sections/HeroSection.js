import { makeStyles } from '@mui/styles';
import BackgroundImage from '../../assets/LogoCompleto.jpg';

// Definindo estilos com makeStyles
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%',
        height: '100vh', // Ajuste conforme necessário
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        margin: 0, // Remove margens que podem limitar a largura
        padding: 0, // Remove preenchimento que pode limitar a largura
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Escurecimento (preto com 50% de opacidade)
        zIndex: 1,
    },
    content: {
        position: 'relative',
        zIndex: 2,
        color: 'white', // Ajuste conforme necessário
        padding: theme.spacing(12, 24),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1, 2),
        },
    },
}));

export default useStyles;
