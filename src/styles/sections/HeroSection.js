import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles'; // Importando a função alpha
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
        maxWidth: "50%",
        color: 'white', // Ajuste conforme necessário
        padding: theme.spacing(12, 12, 12, 24),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1, 2),
            maxWidth: "100%",
            textAlign: "center"
        },
    },
    obs: {
        fontSize: "12px!important",
        fontWeight: "600!important"
    },
    form: {
        position: 'relative',
        zIndex: 2,
        color: 'white', // Ajuste conforme necessário
        padding: theme.spacing(3, 22),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(35, 2),
        },
    },
    formCard: {
        backgroundColor: alpha(theme.colors.primary, .8) + "!important",
        margin: "24px",
        borderRadius: "12px!important",
        padding: theme.spacing(1, 2),
        width: "322px"
    },
    button: {
        color: theme.colors.light + "!important",
        background: theme.colors.dark + "!important"
    },
    datePicker: {
        width: "100%",
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.colors.light, // Fundo branco
            border: '1px solid black',
            '&.Mui-focused fieldset': {
                border: '1px solid black',
            },
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.text.primary, // Cor do label padrão (preta)
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.text.primary, // Cor do label quando está em foco (preta)
        },
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
    title: {
        fontWeight: "600!important",
    }
}));

export default useStyles;
