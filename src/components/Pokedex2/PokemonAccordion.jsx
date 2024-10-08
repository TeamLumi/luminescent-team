import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const PokemonAccordion = ({
  children,
  title,
  id,
  sx,
  bgColor,
  textColor,
  open=false,
  summarySx,
  ...props
}) => {
  const [expanded, setExpanded] = useState(open);

  useEffect(() => {
    if (open) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [open]);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{bgcolor: bgColor, color: textColor, ...sx}}
      {...props}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#777' }} />}
        aria-controls={`panel-${id}-content`}
        id={`panel-${id}-header`}
        sx={{...summarySx}}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
