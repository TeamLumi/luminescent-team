import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const PokemonAccordion = ({ children, title, id, sx, bgColor, textColor }) => {
  return (
    <Accordion sx={{bgcolor: bgColor, color: textColor, ...sx}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#777' }} />}
        aria-controls={`panel-${id}-content`}
        id={`panel-${id}-header`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
