import React, { useState } from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/RetailerSection';
import { Box, Button, Typography } from '@mui/material';


const RetailerSection = () => {

    const [height, setHeight] = useState("250px");

    const classes = useStyles(); // Usando o hook de estilos

    const onClickRegister = () => {
        setHeight("500px");
    }

    return (
        <Grid container className={classes.parallaxContainer} sx={{ height: height }} justifyContent={"flex-start"} spacing={2}>
            <Grid size={12}>
                <Typography className={classes.title} variant='h3'>SOU LOJISTA</Typography>
            </Grid>
            <Grid size={12} sx={{ textAlign: 'center' }}>
                <Button variant='contained' onClick={onClickRegister}> Solicite um cadastro</Button>
            </Grid>
            <Grid size={12} sx={{ textAlign: 'center' }}>
                <Box>
                    <Grid container>
                        FORM
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default RetailerSection;
