import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const fetchMorseAudio = async (morse) => {
    try {
        const response = await axios.post(`${backendUrl}/morse-audio`, { code: morse }, {
            responseType: 'arraybuffer',
        });

        const audioBlob = new Blob([response.data], { type: 'audio/wav' });
        return URL.createObjectURL(audioBlob);
    } catch (error) {
        console.error('Error fetching Morse code audio:', error);
        throw error;
    }
};
