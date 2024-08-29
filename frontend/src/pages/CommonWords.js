import React from 'react';
import axios from 'axios';
import { Container, Typography, Grid } from '@mui/material';
import CommonWordsCard from '../components/CommonWordsCard';

import morseCodeCommonWords from '../constants/morseCodeCommonWords';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CommonWords = () => {
    const handlePlay = async (morseCode) => {
        try {
            const response = await axios.post(`${backendUrl}/morse-audio`, { code: morseCode }, {
                responseType: 'arraybuffer', // receive audio as binary data
            });

            const audioBlob = new Blob([response.data], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('Error fetching Morse code audio:', error);
        }
    };

    return (
        <div>
            <Container sx={{ mt: 4, mb: 8 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6 }}>
                    Common Words in Morse Code
                </Typography>

                <Typography variant="body2" sx={{ mb: 6 }}>
                    Here are some common words Morse code enthusiasts should recognize. If you want to hear how they sound like, click on the card!
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    {morseCodeCommonWords.map((data, index) => (
                        <CommonWordsCard
                            key={index}
                            phrase={data.phrase}
                            code={data.code}
                            description={data.description}
                            onClick={handlePlay}
                        />
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default CommonWords;