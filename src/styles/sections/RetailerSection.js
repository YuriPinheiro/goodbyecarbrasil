import { makeStyles } from '@mui/styles';
import BackgroundImage from '../../assets/LojistaBackground.jpg';


// Definindo estilos com makeStyles
const useStyles = makeStyles((theme) => ({
    parallaxContainer: {
        backgroundAttachment: 'fixed', // fundo fixo para o efeito de parallax
        backgroundPosition: 'center', // posição da imagem
        backgroundRepeat: 'no-repeat', // imagem não se repete
        backgroundSize: 'cover', // cobre todo o conteúdo da div
        display: 'flex',
        transition: 'height 0.5s ease', // Adiciona uma transição suave para a altura
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`, // gradiente sobre a imagem de fundo
        color: 'white', // cor do texto
        padding: theme.spacing(4, 24),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4, 4),
        }
    },
    title: {
        fontSize: "30px!important",
        fontWeight: 600 + '!important',
        textAlign: 'center!important',
        textTransform: 'uppercase',
    },
}));

export default useStyles;
