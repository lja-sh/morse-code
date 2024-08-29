import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Collapse, IconButton, Box, Typography, Paper, Button, Snackbar, Alert } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ClearableTextField from './ClearableTextField';

import morseCodeData from '../constants/morseCodeData';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function AlphabetsTable() {
    const [openCategories, setOpenCategories] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const rowRefs = useRef({}); // Store references to rows
    const tableContainerRef = useRef(null); // Reference to TableContainer

    const handleToggle = (category) => {
        setOpenCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const handlePlay = async (morseCode) => {
        try {
            const response = await axios.post(`${backendUrl}/morse-audio`, { code: morseCode }, {
                responseType: 'arraybuffer', // Ensure we receive the audio as binary data
            });

            const audioBlob = new Blob([response.data], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('Error fetching Morse code audio:', error);
        }
    };

    const handleSearch = (searchChar) => {
        if (searchChar.length > 1) {
            searchChar = searchChar.slice(0, 1);
        }

        setSearchQuery(searchChar);

        if (searchChar === '') {
            setExpandedCategory(null);
            setOpenCategories(prevState => Object.keys(prevState).reduce((acc, category) => {
                acc[category] = false;
                return acc;
            }, {}));
            setSnackbarOpen(false);
            return;
        }

        let foundCategory = null;
        let foundSymbol = null;
        for (const [category, symbols] of Object.entries(morseCodeData)) {
            for (const [symbol, code] of Object.entries(symbols)) {
                if (symbol.toLowerCase() === searchChar.toLowerCase()) {
                    foundCategory = category;
                    foundSymbol = symbol;
                    break;
                }
            }
            if (foundCategory) break;
        }

        if (foundCategory) {
            setSnackbarOpen(false);
            setSnackbarMessage('');

            setExpandedCategory(foundCategory);
            setOpenCategories(prevState => ({
                ...Object.keys(morseCodeData).reduce((acc, category) => {
                    acc[category] = category === foundCategory;
                    return acc;
                }, {}),
                [foundCategory]: true
            }));
        } else {
            setSnackbarMessage('Character not found');
            setSnackbarOpen(true); // Open Snackbar if character is not found
        }

        if (foundSymbol) {
            // delay scrolling to animate collapse
            setTimeout(() => {
                if (tableContainerRef.current && rowRefs.current[foundSymbol]) {
                    // Scroll to category container
                    tableContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Make sure row is visible within the container
                    rowRefs.current[foundSymbol].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setSnackbarMessage('');
    };
    
    const handleClear = () => {
        setSnackbarMessage('Content cleared');
        setSearchQuery('');
        setExpandedCategory(null);
        setOpenCategories(prevState => Object.keys(prevState).reduce((acc, category) => {
            acc[category] = false;
            return acc;
        }, {}));
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <TableContainer component={Paper} ref={tableContainerRef}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={12}>
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
                                    <ClearableTextField
                                        fullWidth
                                        label="Search Character"
                                        placeholder="Search Character"
                                        inputProps={{ maxLength: 1 }}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        value={searchQuery}
                                        onClear={handleClear}
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(morseCodeData).map((category) => (
                            <React.Fragment key={category}>
                                <TableRow>
                                    <TableCell colSpan={3} sx={{ backgroundColor: '#eee' }}>
                                        <Box display="flex" alignItems="center">
                                            <IconButton onClick={() => handleToggle(category)}>
                                                {openCategories[category] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </IconButton>
                                            <Typography variant="h6">{category}</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Collapse in={openCategories[category]}>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Symbol</TableCell>
                                                        <TableCell>Morse Code</TableCell>
                                                        <TableCell>Listen</TableCell>
                                                    </TableRow>
                                                    {Object.entries(morseCodeData[category]).map(([symbol, code]) => (
                                                        <TableRow
                                                            key={symbol}
                                                            ref={el => rowRefs.current[symbol] = el}
                                                            sx={{
                                                                backgroundColor: symbol.toLowerCase() === searchQuery.toLowerCase() ? '#ffffcc' : 'inherit', // Pale yellow highlight
                                                                fontWeight: symbol.toLowerCase() === searchQuery.toLowerCase() ? 'bold' : 'normal',
                                                            }}
                                                        >
                                                            <TableCell>
                                                                {symbol}
                                                            </TableCell>
                                                            <TableCell>
                                                                {code}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="contained" color="primary" onClick={() => handlePlay(code)}>
                                                                    Play
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            // message={snackbarMessage}
            // action={
            //     <Button color="inherit" onClick={handleCloseSnackbar}>
            //         Close
            //     </Button>
            // }
            >
                <Alert onClose={handleCloseSnackbar} severity="info">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AlphabetsTable;