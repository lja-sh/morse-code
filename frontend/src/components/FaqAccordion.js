import React from 'react';
import { Container, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqAccordion = ({ faq }) => {
    return (
        <Container>
            {faq.map((faq, index) => (
                <Accordion key={index} sx={{ borderRadius: 1 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index.toString()}-content`}
                        id={`panel${index.toString()}-header`}
                        sx={{ backgroundColor: '#eee' }}
                    >
                        {faq.question}
                    </AccordionSummary>
                    <AccordionDetails>
                        {faq.answer}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default FaqAccordion;