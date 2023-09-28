import React, { useState } from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';

export const PokemonInfoButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <Box display="flex" justifyContent="center" marginLeft="5px">
          <button onClick={handleOpen} style={{backgroundColor: 'var(--ifm-color-info)', borderRadius: '5px'}}>Features</button>
          <Modal open={open} onClose={handleClose}>
            <Box style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'var(--ifm-color-content-inverse)',
              color: 'var(--ifm-color-content)',
              padding: '16px',
              borderRadius: '8px',
              border: 'var(--ifm-table-border-width) solid var(--ifm-table-border-color)',
            }}
            >
              <Typography variant="h6">
This site documents all Pokémon available in Luminescent Platinum 2.0F, including their types, abilities, stats, evolution methods, forms, wild held items, and movesets. It currently does not include locations, but you may use our <a href="https://docs.google.com/spreadsheets/d/1a-NSfEgtt8kAr1cXwKkmY2SylYMs2tUG5tMSIhK0-OY/edit">Pokémon Locations by Route documentation</a> or the Pokédex channel in our <a href="https://discord.gg/luminescent">Discord</a> to access that information in the meanwhile.
<br/><br/>
For your convenience:
<ul>
  <li>Clicking on an Ability will list its effects on the same page.</li>
  <li>Clicking on item rates will also show you what they change to when a Pokémon with Frisk or Super Luck are at the front of the party.</li>
</ul>
Planned Changes:
<ul>
  <li>Encounter locations to the Pokédex displayed here.</li>
  <li>A comparison toggle to view vanilla BDSP stats to against any changes we have made.</li>
</ul>
Please keep an eye on this main page to see what other features may become available.
</Typography>
            </Box>
          </Modal>
        </Box>
    )
}