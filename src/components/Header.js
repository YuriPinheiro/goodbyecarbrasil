import React from 'react';
import { AppBar, Divider, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import Grid from "@mui/material/Grid2";
import useStyles from '../styles/components/Header';
import LogoText from "../assets/LogoTexto.jpg";
import { ReactComponent as LinkedinIcon } from "../assets/LinkedinIcon.svg";
import { ReactComponent as InstagramIcon } from "../assets/InstagramIcon.svg";
import { ReactComponent as WhatsappIcon } from "../assets/WhatsappIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/PhoneIcon.svg";

const Header = () => {
    const classes = useStyles(); // Usando o hook de estilos

    const theme = useTheme(); // Para usar os breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é menor que 'md'


    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Grid container
                    alignItems="center" // Alinhamento vertical dos itens
                    justifyContent="space-between" // Espaço entre os itens
                    direction={isMobile ? "column" : "row"}
                    sx={{width:"100%"}}
                    spacing={2}
                    className={classes.container}>
                    {/* Logotipo ou Título */}
                    <Grid item>
                        <img src={LogoText} alt="Logo" width={190} />
                    </Grid>

                    {/* Seção com a cidade e redes sociais */}

                    <Grid item>
                        <Grid container spacing={isMobile ? 1 : 4} alignItems={"center"}  direction={isMobile ? "column" : "row"}>
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
                                                <LinkedinIcon />
                                            </Grid>
                                            <Grid item>
                                                <InstagramIcon />
                                            </Grid>
                                            <Grid item>
                                                <WhatsappIcon />
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
                                            (54) 99999-9999
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
