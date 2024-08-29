import React from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => (
    <AppBar position="static">
        <Container maxWidth="lg">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Morse Code Education
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/alphabets">Alphabets</Button>
                <Button color="inherit" component={Link} to="/common-words">Common Words</Button>
                <Button color="inherit" component={Link} to="/faq">FAQ</Button>
            </Toolbar>
        </Container>
    </AppBar>
);

export default Header;