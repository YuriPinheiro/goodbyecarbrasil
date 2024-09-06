import { makeStyles } from '@mui/styles';

// Definindo estilos com makeStyles
const useStyles = makeStyles((theme) => ({
    appBar: {
        height: '110px',
        backgroundColor: theme.palette.background.paper + "!important", // Usando cor de fundo do tema

        // Estilo para telas menores que 1024px
        [theme.breakpoints.down('md')]: {
            height: '220px',
        },
    },
    container: {
        margin: theme.spacing(3, 24),
        [theme.breakpoints.down('md')]: {
            margin: theme.spacing(3, 4),
        },
    },
}));

export default useStyles;
