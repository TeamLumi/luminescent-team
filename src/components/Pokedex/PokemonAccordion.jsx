import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const PokemonAccordion = ({ children, title, id }) => {
  return (
    <Accordion sx={{ color: 'inherit', backgroundColor: 'inherit' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#777', backgroundColor: 'inherit' }} />}
        aria-controls={`panel-${id}-content`}
        id={`panel-${id}-header`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
