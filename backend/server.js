const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // destination folder
    },
    filename: function (req, file, cb) {
        // retain original filename with extension
        cb(null, file.originalname);
    }
}); 

const WavDecoder = require('wav-decoder');


const upload = multer({ storage: storage });
require('dotenv').config();

const { encode, decode } = require('./src/morseCodeUtils');
const { createMorseAudio, processAudioToMorse } = require('./src/audioUtils');

const app = express();

const reactFrontendUrl = process.env.REACT_FRONTEND_URL || '*';

app.use(cors({
    origin: reactFrontendUrl
}));

app.use(express.json());

app.post('/encode', (req, res) => {
    const { message } = req.body;
    const encodedMessage = encode(message);
    res.json({ encodedMessage });
});

app.post('/decode', (req, res) => {
    const { message } = req.body;
    const decodedMessage = decode(message);
    res.json({ decodedMessage });
});

app.post('/morse-audio', async (req, res) => {
    const { code } = req.body || '';

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    try {
        const audioData = await createMorseAudio(code);
        res.setHeader('Content-Type', 'audio/wav');
        res.send(Buffer.from(audioData));

    } catch (error) {
        const errorMessage = typeof error.message === 'string' ? error.message : 'An unexpected error occurred.';
        res.status(500).send(errorMessage);
    }

});

app.post('/process-audio', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        const filePath = req.file.path;
        const buffer = fs.readFileSync(filePath);

        const audioData = await WavDecoder.decode(buffer);
        const samples = audioData.channelData[0];
        const sampleRate = audioData.sampleRate;

        const morseCode = await processAudioToMorse(samples, sampleRate);

        const decodedMessage = morseCode;

        res.json({ decodedMessage });

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });
    } catch (error) {
        console.error('Error processing audio:', error);
        res.status(500).send('Server error');

        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));