import React, { useState, useEffect, useRef } from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/HeroSection';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LocalConfig from '../LocalConfig';
import InputMask from 'react-input-mask';

import moment from 'moment';

function MaskedTextField({ mask, value, onChange, ...props }) {
    const inputRef = useRef(null);

    return (
        <InputMask mask={mask} value={value} onChange={onChange}>
            {(inputProps) => (
                <TextField
                    {...inputProps}
                    {...props}
                    inputRef={(ref) => {
                        inputRef.current = ref; 
                        if (inputProps.ref) {
                            inputProps.ref(ref);
                        }
                    }}
                />
            )}
        </InputMask>
    );
}

const HeroSection = () => {

    const [form, setForm] = useState({});
    const [error, setError] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        console.log(form);
        setError(false);
    }, [form]);


    const onClickSend = () => {
        if (!form.name || !form.brand || !form.model || !form.year) {
            setError(true);
            return
        }

        const data = form;

        const message = `
Olá, estou entrando em contato através do site!   

*Nome*
${data.name}
        
*Marca*
${data.brand}
        
*Modelo*
${data.model}
        
*Ano*
${data.year}
`.trim();

        const encodedMessage = encodeURIComponent(message);

       
        const url = `${LocalConfig.whatsappURL}?text=${encodedMessage}`;

        window.open(url, '_blank');
    }

    const onChangeForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const onChangeYear = (value) => {
        let year = value.format("YYYY");
        setForm((prev) => ({ ...prev, year: year }));
    }

    return (
        <div id='home-section'>
            <Grid container className={classes.container} justifyContent={"center"}>
                <div className={classes.overlay} />
                <Grid size={{ xs: 12, md: 6 }} className={classes.content}>
                    <Typography variant='h2' className={classes.title}>Venda seu carro sem burocracia.</Typography>
                    <Typography variant='h5'>Adeus carro, olá dinheiro!</Typography>
                </Grid>
                <Grid className={classes.form}>
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
                                                    <TextField fullWidth error={error} name='name' onChange={onChangeForm} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
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
                                                    <MaskedTextField
                                                        mask="(99) 99999-9999"
                                                        fullWidth name='phone'
                                                        onChange={onChangeForm}
                                                        id="outlined-basic"
                                                        size='small'
                                                        variant="outlined"
                                                        className={classes.textField}
                                                    />
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
                                                    <TextField fullWidth name='brand' error={error} onChange={onChangeForm} placeholder={"Ex: Renault"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
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
                                                    <TextField fullWidth name='model' error={error} onChange={onChangeForm} placeholder={"Ex: Kwid"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
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
                                                                minDate={moment('2000-01-01')}
                                                                maxDate={moment('2025-12-31')}
                                                                placeholder={"2024"}
                                                                onChange={onChangeYear}
                                                                error={error}
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
                                                                        size: 'small', 
                                                                        placeholder: 'Escolha um ano',
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
                                                <Button onClick={onClickSend} className={classes.button} variant='contained'>Entre em contato</Button>
                                            </Grid>
                                        </Box>
                                    </Grid>

                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default HeroSection;
