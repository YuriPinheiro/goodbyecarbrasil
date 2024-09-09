import React from 'react';
import Grid from "@mui/material/Grid2";
import HeroSection from '../sections/HeroSection';
import StepsSection from '../sections/StepsSection.js';
import AdvantageSection from '../sections/AdvantageSection.js';
import RetailerSection from '../sections/RetailerSection.js';


const HomePage = () => {
    return (
        <Grid>
            <HeroSection />
            <StepsSection />
            <AdvantageSection />
            <RetailerSection />
        </Grid>
    );
};

export default HomePage;
