import { makeStyles } from '@mui/styles';
import BackgroundImage from '../../assets/LojistaBackground.jpg';
import { alpha } from '@mui/material/styles'; // Importando a função alpha


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
    textField: {
        '& .MuiInputBase-root': {
            color: 'black', // Cor do texto de entrada
            backgroundColor: '#FFFFFF', // Fundo branco
        },
        '& .MuiInputLabel-root': {
            color: 'black', // Cor do texto do label
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'black', // Cor do texto do label quando está em foco
        },
        '& .MuiInputLabel-root.MuiFormLabel-filled': {
            color: 'black', // Cor do texto do label quando o campo está preenchido
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            },
            '&.Mui-focused fieldset': {
                border: '1px solid black', // Cor da borda quando está em foco
            },
        },
    },
    form: {
        position: 'relative',
        zIndex: 2,
        color: 'white', // Ajuste conforme necessário
        padding: theme.spacing(3, 24),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4, 2),
        },
    },
    formCard: {
        backgroundColor: alpha(theme.colors.primary, .8) + "!important",
        margin: "24px",
        borderRadius: "12px!important",
        padding: theme.spacing(1, 2),
    },
    formButton: {
        backgroundColor: theme.colors.dark+'!important',
        color: theme.colors.light+'!important'
    },
    label:{
        textAlign: 'left'
    }
}));

export default useStyles;
