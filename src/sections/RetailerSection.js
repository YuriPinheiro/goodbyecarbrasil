import React, { useState } from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/RetailerSection';
import { Box, Button, Card, CardContent, Grow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

const initialHeight = "200px"
const RetailerSection = () => {

    const [height, setHeight] = useState(initialHeight);

    const theme = useTheme(); // Para usar os breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é menor que 'md'

    const classes = useStyles(); // Usando o hook de estilos

    const onClickRegister = () => {
        if (height === initialHeight) {
            if (isMobile) {
                setHeight("720px")
            } else {
                setHeight("500px");
            }
        } else {
            setHeight(initialHeight);
        }
    }

    return (
        <Grid container className={classes.parallaxContainer} sx={{ height: height }} justifyContent={"flex-start"} spacing={2}>
            <Grid size={12} data-aos="zoom-in">
                <Typography className={classes.title} variant='h3'>SOU LOJISTA</Typography>
            </Grid>
            <Grid size={12} sx={{ textAlign: 'center' }} data-aos="zoom-in">
                <Button variant='contained' onClick={onClickRegister}> Solicite um cadastro</Button>
            </Grid>
            <Grid size={12} sx={{ textAlign: 'center' }}>
                <Box>
                    <Grid container>
                        <Grow in={height !== initialHeight}>
                            <Grid item className={classes.form}>
                                <Card className={classes.formCard}>
                                    <CardContent >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>Nome</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <TextField fullWidth placeholder={"João da Silva"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>Razão social</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <TextField fullWidth id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>CNPJ</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <TextField fullWidth placeholder={"XX.XXX.XXX/0001-XX"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>Contato</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <TextField fullWidth placeholder={"(99) 9999-9999"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>Cidade</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <TextField fullWidth placeholder={"Caxias do Sul"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }} alignContent={'end'} >
                                                    <Button variant='contained' className={classes.formButton}>Entre em contato</Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grow>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default RetailerSection;
