import React from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/AboutSection';
import { Box, Typography } from '@mui/material';


const AboutSection = () => {

    const classes = useStyles(); // Usando o hook de estilos


    return (
        <Grid container className={classes.container} justifyContent={"center"} spacing={4}>
            <Grid size={12} data-aos={'fade-down'}>
                <Typography className={classes.title} variant='h3'>SOBRE NÓS</Typography>
            </Grid>
            <Grid size={12} data-aos={'zoom-in-up'}>
                <Typography className={classes.subtitle} variant='subtitle1'>Somos uma empresa séria que prioriza o cliente e garante bons resultados para a negociação do seu veículo.</Typography>
            </Grid>

            <Grid size={12} data-aos={"flip-down"}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container className={classes.itensContainer} spacing={2} justifyContent={'center'}>
                        <Grid size={12}>
                            <Typography className={classes.videoTitle} variant='subtitle1'>Confira como nosso processo é prático e descomplicado.</Typography>
                        </Grid>
                        <Grid size={12} sx={{ textAlign: 'center' }}>
                            <Box
                                component="video"
                                src="/videos/GoodbyerCarBrasil.mp4" // Substitua pela URL do seu vídeo
                                controls
                                autoPlay
                                loop
                                muted
                                sx={{
                                    width: '80%', // O vídeo ocupará 100% da largura do seu container
                                    maxHeight: '500px', // Limite opcional para a altura do vídeo
                                    borderRadius: '8px', // Arredondamento opcional dos cantos
                                    boxShadow: 3, // Sombra opcional para o vídeo
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>

        </Grid>
    );
};

export default AboutSection;
