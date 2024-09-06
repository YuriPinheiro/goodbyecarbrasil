import React from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/HeroSection';

const HeroSection = () => {

    const classes = useStyles(); // Usando o hook de estilos

    return (
        <Grid container className={classes.container}>
            <div className={classes.overlay} />
            <Grid item xs={12} className={classes.content}>
                {/* Coloque o conteúdo aqui */}
                <h1>Seu Conteúdo Aqui</h1>
                <p>Texto exemplo dentro do container com imagem de fundo.</p>
            </Grid>
        </Grid>
    );
};

export default HeroSection;
