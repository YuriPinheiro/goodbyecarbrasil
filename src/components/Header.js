import React from 'react';
import { AppBar, Divider, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import Grid from "@mui/material/Grid2";
import useStyles from '../styles/components/Header';
import LogoText from "../assets/LogoTexto.jpg";
import { ReactComponent as LinkedinIcon } from "../assets/LinkedinIcon.svg";
import { ReactComponent as InstagramIcon } from "../assets/InstagramIcon.svg";
import { ReactComponent as WhatsappIcon } from "../assets/WhatsappIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/PhoneIcon.svg";
import LocalConfig from '../LocalConfig';
import ScrollNavigationBar from './ScrollNavigator';

const phoneNumber = "(54) 98447-9160";

// Formatar o número de telefone removendo caracteres não numéricos
const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');

const Header = () => {
    const classes = useStyles(); // Usando o hook de estilos

    const theme = useTheme(); // Para usar os breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é menor que 'md'

    const onClickSocial = (social) => {
        if (social === 'linkedin') {
            window.open("https://br.linkedin.com", '_blank');
            return
        }
        if (social === 'instagram') {
            window.open("https://www.instagram.com/goodbyecar_brasil/", '_blank');
            return
        }
        if (social === 'whatsapp') {
            window.open(LocalConfig.whatsappURL, '_blank');
            return
        }
    }

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Grid container
                        alignItems="center" // Alinhamento vertical dos itens
                        justifyContent="space-between" // Espaço entre os itens
                        direction={isMobile ? "column" : "row"}
                        sx={{ width: "100%" }}
                        spacing={2}
                        className={classes.container}>
                        {/* Logotipo ou Título */}
                        <Grid item>
                            <img src={LogoText} alt="Logo" width={190} />
                        </Grid>

                        {/* Seção com a cidade e redes sociais */}

                        <Grid item>
                            <Grid container spacing={isMobile ? 1 : 4} alignItems={"center"} direction={isMobile ? "column" : "row"}>
                                <Grid item xs>
                                    <Grid container direction="column" alignItems={"center"} spacing={1}>
                                        {/* Nome da cidade */}
                                        <Grid item>
                                            <Typography sx={{ color: "white", fontSize: "16px", fontWeight: 300 }}>Caxias do Sul - RS</Typography>
                                        </Grid>

                                        {/* Logos das redes sociais */}
                                        <Grid item>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <div onClick={() => { onClickSocial('linkedin') }}>
                                                        <LinkedinIcon />
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <div onClick={() => { onClickSocial('instagram') }}>
                                                        <InstagramIcon />
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <div onClick={() => { onClickSocial('whatsapp') }}>
                                                        <WhatsappIcon />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {!isMobile && <Divider orientation="vertical" sx={{ background: "white" }} variant="middle" flexItem />}

                                <Grid item xs>
                                    <Grid container alignItems={"center"} spacing={1}>
                                        <Grid item sx={{ marginTop: "10px" }}>
                                            <PhoneIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='h5' sx={{ color: "white" }}>
                                                <a href={`tel:${formattedPhoneNumber}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    {phoneNumber}
                                                </a>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
            <ScrollNavigationBar />
        </>
    );
};

export default Header;
