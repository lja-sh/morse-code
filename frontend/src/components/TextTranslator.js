import React, { useState, useRef, useEffect } from 'react';
import { Container, Grid, Box, Snackbar, Alert } from '@mui/material';
import { MorsePlayer, MorseDownloader } from './MorsePlayer';
import ClearableTextField from './ClearableTextField';
import morseCodeData from '../constants/morseCodeData';

const morseCodeMap = Object.assign(
    {},
    morseCodeData.Letters,
    morseCodeData.Numbers,
    morseCodeData["Special Characters"],
    morseCodeData.Punctuation
);

const reverseMorseCodeMap = Object.keys(morseCodeMap).reduce((obj, key) => {
    obj[morseCodeMap[key]] = key;
    return obj;
}, {});

const TextTranslator = ({ morseCode, onClear }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [text, setText] = useState('');
    const [morse, setMorse] = useState(morseCode);

    const morsePlayerRef = useRef(null);

    const trimExtraSpaces = (value) => {
        return value.replace('\n', ' ').replace(/\s{2,}/g, ' ');
    };

    const handleTextChange = (e) => {
        const inputValue = e.target.value;
        const filteredValue = trimExtraSpaces(inputValue.toUpperCase());
        setText(filteredValue);
        setMorse(filteredValue.split('').map(char => morseCodeMap[char] || '').join(' '));

        if (morsePlayerRef.current) {
            morsePlayerRef.current.stopAudio();
        }
    };

    const handleMorseChange = (e) => {
        const inputValue = e.target.value;
        const filteredValue = trimExtraSpaces(inputValue.replace(/[^ \./-]/g, ''));

        setMorse(filteredValue);
        setText(filteredValue.split(' ').map(code => reverseMorseCodeMap[code] || '').join(''));

        if (morsePlayerRef.current) {
            morsePlayerRef.current.stopAudio();
        }
    };

    const handleClear = () => {
        setText('');
        setMorse('');
        if (onClear) {
            onClear();
        }
        setSnackbarMessage('Content cleared');
        setSnackbarOpen(true);
    };

    const handleCopy = () => {
        setSnackbarMessage('Content copied to clipboard');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        setMorse(morseCode);
        setText(morseCode.split(' ').map(code => reverseMorseCodeMap[code] || '').join(''));
    }, [morseCode]);

    return (
        <Container sx={{ mt: 4, mb: 8 }}>
            <Grid container spacing={2} sx={{ mb: 6 }} alignItems="center">
                <Grid item xs={12} md={5}>
                    <ClearableTextField
                        fullWidth
                        label="Text to Morse Code"
                        placeholder="Text to Morse Code"
                        multiline
                        minRows={3}
                        maxRows={3}
                        value={text}
                        onChange={handleTextChange}
                        onClear={handleClear}
                        onCopy={handleCopy}
                    />
                </Grid>

                <Grid item xs={12} md={1}>
                </Grid>

                <Grid item xs={12} md={5}>
                    <ClearableTextField
                        fullWidth
                        label="Morse Code to Text"
                        placeholder='-- --- .-. ... . / -.-. --- -.. . / - --- / - . -..- -'
                        multiline
                        minRows={3}
                        maxRows={3}
                        value={morse}
                        onChange={handleMorseChange}
                        onClear={handleClear}
                        onCopy={handleCopy}
                    />
                </Grid>

                <Grid item xs={12} md={1}>
                    <Box sx={{
                        display: 'flex', flexDirection: {
                            xs: 'row',
                            md: 'column'
                        },
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}>
                        <MorsePlayer ref={morsePlayerRef} morse={morse} />
                        <MorseDownloader morse={morse} />
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="info">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TextTranslator;