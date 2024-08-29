import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { fetchMorseAudio } from '../utils/audioUtils';

const MorsePlayer = forwardRef(({ morse }, ref) => {
    // const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useImperativeHandle(ref, () => ({
        stopAudio: () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
            }
        }
    }));

    const handlePlayPause = async () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                const audioUrl = await fetchMorseAudio(morse);
                const newAudio = new Audio(audioUrl);
                // setAudio(newAudio);
                audioRef.current = newAudio;

                newAudio.play();
                setIsPlaying(true);

                newAudio.addEventListener('ended', () => {
                    setIsPlaying(false);
                });

            } catch (error) {
                console.error('Error fetching Morse code audio:', error);
            }
        }
    };

    return (
        <IconButton variant="contained" color="primary" onClick={handlePlayPause}>
            {isPlaying ? <StopCircleIcon /> : <PlayCircleIcon />}
        </IconButton>
    );
});

const MorseDownloader = ({ morse }) => {
    const handleDownload = async () => {
        try {
            const audioUrl = await fetchMorseAudio(morse);
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = 'morse_code.wav';
            a.click();
            URL.revokeObjectURL(audioUrl);
        } catch (error) {
            console.error('Error downloading Morse code audio:', error);
        }
    };

    return (
        <IconButton variant="contained" color="success" onClick={handleDownload}>
            <FileDownloadIcon />
        </IconButton>
    );
};

export { MorsePlayer, MorseDownloader };