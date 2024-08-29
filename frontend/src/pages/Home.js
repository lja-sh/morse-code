import React, { useState } from 'react';
import TextTranslator from '../components/TextTranslator';
import AudioTranslator from '../components/AudioTranslator';
import { Container, Typography } from '@mui/material';

const Home = () => {
  const [morseCode, setMorseCode] = useState('');

  const handleAudioTranslation = (morseCodeFromAudio) => {
    setMorseCode(morseCodeFromAudio);
  };

  const handleClearMorseCode = () => {
    setMorseCode('');
  };

  return (
    <div>
      <Container sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Morse Code Translator
        </Typography>

        <Typography variant="body1" sx={{ mb: 6 }}>
          Unlock the Secrets of Morse Code! Whether you're a history buff, a coding enthusiast, or just looking for a fun way to challenge your brain, our Morse Code Translator is here to help! Easily convert text to Morse code and vice versa, and discover the fascinating world of this timeless communication method. Try it out and see how you can decode and encode messages like a pro!
        </Typography>

        <TextTranslator morseCode={morseCode} onClear={handleClearMorseCode} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          Alternatively, you can try to upload an audio file instead!
        </Typography>

        <AudioTranslator onAudioTranslate={handleAudioTranslation} />
      </Container>
    </div>
  );
};

export default Home;