import React from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/HeroSection';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const HeroSection = () => {

    const classes = useStyles(); // Usando o hook de estilos

    return (
        <Grid container className={classes.container} justifyContent={"center"}>
            <div className={classes.overlay} />
            <Grid item className={classes.content}>
                {/* Coloque o conteúdo aqui */}
                <Typography variant='h2' className={classes.title}>Venda seu carro sem burocracia.</Typography>
                <Typography variant='h5'>Adeus carro, olá dinheiro!</Typography>
            </Grid>
            <Grid item className={classes.form}>
                <Card className={classes.formCard}>
                    <CardContent >
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <Typography className={classes.obs}> Preencha e agende sua avaliação gratuita</Typography>
                                </Grid>
                                <Grid size={12}>
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
                                <Grid size={12}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container>
                                            <Grid size={12}>
                                                <Typography className={classes.label}>Telefone</Typography>
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField fullWidth placeholder={"(99) 99999-9999"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid size={12}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container>
                                            <Grid size={12}>
                                                <Typography className={classes.label}>Marca</Typography>
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField fullWidth placeholder={"Ex: Renault"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid size={12}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container>
                                            <Grid size={12}>
                                                <Typography className={classes.label}>Modelo</Typography>
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField fullWidth placeholder={"Ex: Kwid"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid size={12}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container>
                                            <Grid size={12}>
                                                <Typography className={classes.label}>Ano</Typography>
                                            </Grid>
                                            <Grid size={12}>
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DemoContainer components={['DatePicker']}>
                                                        <DatePicker
                                                            className={classes.datePicker}
                                                            views={['year']}
                                                            minDate={moment('2005-01-01')} // Definindo a data mínima como 2005
                                                            maxDate={moment('2024-12-31')} // Definindo a data máxima como 2024
                                                            placeholder={"2024"}
                                                            slotProps={{
                                                                layout: {
                                                                    sx: {
                                                                        color: '#18E8DB',
                                                                        borderRadius: '0px',
                                                                        borderWidth: '1px',
                                                                        backgroundColor: '#282828',
                                                                    }
                                                                },
                                                                textField: {
                                                                    size: 'small', // Define o tamanho do campo de entrada como 'small' ou 'medium'
                                                                    placeholder: 'Escolha um ano', // Define o placeholder do campo
                                                                },
                                                            }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>

                                <Grid size={12}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container justifyContent={'center'}>
                                            <Button className={classes.button} variant='contained'>Entre em contato</Button>
                                        </Grid>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default HeroSection;
