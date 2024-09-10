import React from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/StepsSection';
import { Box, Typography } from '@mui/material';

const steps = [
    { title: "Agendamento", subtitle: "Preencha o formulario e agende a vistoria;" },
    { title: "Avaliação", subtitle: "Nosso consultor avaliará seu veículo juntamente com você;" },
    { title: "Anúncio", subtitle: "Seu anúncio será feito em nossa rede de parceiros;" },
    { title: "Proposta", subtitle: "Receba a melhor oferta;" }
]

const StepsSection = () => {

    const classes = useStyles(); // Usando o hook de estilos

    const StepCircle = (props) => {

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} justifyContent={'center'}>
                    <Grid className={classes.circle}>
                        <Typography className={classes.stepLabel}>
                            {props.index}
                        </Typography>
                    </Grid>
                    <Grid size={{ sx: 12, md: 6 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container>
                                <Grid size={12}>
                                    <Typography className={classes.stepTitle}>{props.step.title}</Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography className={classes.stepSubtitle}>{props.step.subtitle}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <div id='steps-section'>
            <Grid container className={classes.container} justifyContent={"center"} spacing={2}>
                <Grid size={12} data-aos="fade-down">
                    <Typography className={classes.title} variant='h3'>COMO FUNCIONA ?</Typography>
                </Grid>
                <Grid size={12} data-aos="fade-left">
                    <Typography className={classes.subtitle} variant='subtitle1'>TEMOS UM PROCESSO COMPLETO PARA GARANTIR A MELHOR PROPOSTA.</Typography>
                </Grid>
                <Grid size={12} data-aos="zoom-in">
                    <Box sx={{ flexGrow: 1 }}>

                        <Grid container className={classes.stepsContainer} justifyContent={"center"} spacing={6} >
                            {
                                steps.map((step, i) => {

                                    return (
                                        <Grid size={{ sx: 12, md: 6 }}>
                                            <StepCircle step={step} index={i + 1} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>

                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default StepsSection;
