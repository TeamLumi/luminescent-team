import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Typography, Avatar, List } from '@mui/material';
import { getPokemonLearnset } from '../../../dexUtils';
import LearnsetListItem from './learnsetListItem';


const INHERIT_STYLES = { color: 'inherit', background: 'inherit' };
const SVG_STYLE = { color: '#777', background: 'inherit' };
export default function PokedexAccordion(props) {
  const moveList = props.learnset ?? [];
  console.log(moveList);
  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={props.expanded === props.panelId}
      onChange={props.handleChange(props.panelId)}
      sx={INHERIT_STYLES}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={SVG_STYLE}/>}
        sx={{...INHERIT_STYLES, paddingLeft: '3%'}}
        aria-controls={props.ariaLabel}
        id={props.headerId}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          {props.learnsetName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={INHERIT_STYLES}>
        <List dense={true}>
          {moveList.map(({level, moveId}, i) => (
            <LearnsetListItem level={level} myKey={i} key={i} moveId={moveId} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}