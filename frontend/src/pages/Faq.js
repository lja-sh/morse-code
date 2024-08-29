import { Container, Typography } from '@mui/material';
import FaqAccordion from '../components/FaqAccordion';

import morseCodeFaq from '../constants/morseCodeFaq';

const Faq = () => {
    return (
        <Container sx={{ mt: 4, mb: 8 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                About Morse Code
            </Typography>

            <FaqAccordion faq={morseCodeFaq} />
        </Container>
    );
};

export default Faq;