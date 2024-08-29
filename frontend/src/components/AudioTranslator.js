import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const StyledInput = styled('input')({
    display: 'none',
});

function AudioTranslator({ onAudioTranslate }) {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState('');
    const [fileName, setFileName] = useState('No file chosen');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : 'No file chosen');
        setError('');
        e.target.value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a file.');
            return;
        }

        setLoading(true);

        const formData = new FormData();

        // const uniqueFileName = `${file.name}_${Date.now()}`;
        formData.append('audio', file);

        try {
            const response = await axios.post(`${backendUrl}/process-audio?timestamp=${Date.now()}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const decodedMessage = response.data.decodedMessage;
            setResult(decodedMessage);
            onAudioTranslate(decodedMessage);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
            setFile(null);
            setFileName('No file chosen');
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={6}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="audio-upload">
                        <StyledInput
                            id="audio-upload"
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                        />
                        <Button variant="contained" component="span">
                            Choose File
                        </Button>
                    </label>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 16, position: 'relative' }}
                    // disabled={loading}

                    >
                        {loading ? (
                            <CircularProgress size="1.5rem" color="inherit" />
                        ) : (
                            'Upload'
                        )}
                    </Button>

                    <Typography variant="body1" style={{ marginLeft: 16, display: 'inline-block' }}>
                        {fileName}
                    </Typography>

                    {error && (
                        <Typography variant="body2" color="error" style={{ marginLeft: 16, marginTop: 8 }}>
                            {error}
                        </Typography>
                    )}
                </form>
            </Grid>
        </Grid>
    );
}

export default AudioTranslator;