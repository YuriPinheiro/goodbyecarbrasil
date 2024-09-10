import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Slide, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../styles/components/Header';

const ScrollNavigationBar = () => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Hook para verificar se a tela é de um dispositivo móvel
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 110) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = -100; 
            const elementPosition = element.getBoundingClientRect().top; 
            const offsetPosition = elementPosition + window.scrollY + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });

            // Fecha o menu caso esteja em um dispositivo móvel
            if (isMobile) {
                setIsDrawerOpen(false);
            }
        }
    };

    return (
        <Slide direction="down" in={show}>
            <AppBar position="fixed" color="primary" className={classes.scrollNavBar}>
                <Toolbar>
                    {isMobile ? (
                        <>
                            {/* Ícone do menu para dispositivos móveis */}
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography>GoodbyeCarBrasil</Typography>
                            {/* Menu Drawer para dispositivos móveis */}
                            <Drawer
                                anchor="left"
                                open={isDrawerOpen}
                                onClose={() => setIsDrawerOpen(false)}
                            >
                                <List>
                                    <ListItem button onClick={() => scrollToSection('home-section')}>
                                        <ListItemText className={classes.drawerItem} primary="Início" />
                                    </ListItem>
                                    <ListItem button onClick={() => scrollToSection('steps-section')}>
                                        <ListItemText className={classes.drawerItem} primary="Como funciona" />
                                    </ListItem>
                                    <ListItem button onClick={() => scrollToSection('about-section')}>
                                        <ListItemText className={classes.drawerItem} primary="Sobre nós" />
                                    </ListItem>
                                    <ListItem button onClick={() => scrollToSection('contacts-section')}>
                                        <ListItemText className={classes.drawerItem} primary="Contatos" />
                                    </ListItem>
                                </List>
                            </Drawer>
                        </>
                    ) : (
                        <>
                            {/* Botões para navegação em telas maiores */}
                            <Button color="inherit" onClick={() => scrollToSection('home-section')}>
                                <Typography className={classes.menuItem}>
                                    Início
                                </Typography>
                            </Button>
                            <Button color="inherit" onClick={() => scrollToSection('steps-section')}>
                                <Typography className={classes.menuItem}>
                                    Como funciona
                                </Typography>
                            </Button>
                            <Button color="inherit" onClick={() => scrollToSection('about-section')}>
                                <Typography className={classes.menuItem}>
                                    Sobre nós
                                </Typography>
                            </Button>
                            <Button color="inherit" onClick={() => scrollToSection('contacts-section')}>
                                <Typography className={classes.menuItem}>
                                    Contatos
                                </Typography>
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Slide>
    );
};

export default ScrollNavigationBar;
