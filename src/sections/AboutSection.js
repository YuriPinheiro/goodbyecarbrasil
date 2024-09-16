import React from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/AboutSection';
import { Box, Typography } from '@mui/material';


const AboutSection = () => {

    const classes = useStyles();


    return (
        <div id='about-section'>
            <Grid container className={classes.container} justifyContent={"center"} spacing={4}>
                <Grid size={12} data-aos={'fade-down'}>
                    <Typography className={classes.title} variant='h3'>SOBRE NÓS</Typography>
                </Grid>
                <Grid size={12} data-aos={'zoom-in-up'}>
                    <Typography className={classes.subtitle} variant='subtitle1'>Somos uma empresa séria que prioriza o cliente e garantimos ótimos resultados para a negociação do seu veículo.</Typography>
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
                                    src="/videos/GoodbyerCarBrasil.mp4"
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    sx={{
                                        width: '80%',
                                        maxHeight: '500px',
                                        borderRadius: '8px', 
                                        boxShadow: 3, 
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
};

export default AboutSection;
