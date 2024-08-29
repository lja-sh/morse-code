import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    },
}));

const CommonWordsCard = ({ phrase, code, description, onClick }) => {
    return (
        <StyledCard onClick={() => onClick(code)}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {phrase}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </StyledCard>
    );
};

export default CommonWordsCard;