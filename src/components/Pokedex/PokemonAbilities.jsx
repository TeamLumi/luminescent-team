import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export const PokemonAbilities = ({ abilityName1, abilityName2, abilityNameHidden }) => {
  return (
    <Box display="flex">
      <Typography sx={{ textDecoration: 'underline', fontSize: '0.9rem', marginRight: '8px' }}>
        {abilityName1},
      </Typography>
      <Typography sx={{ textDecoration: 'underline', fontSize: '0.9rem', marginRight: '8px' }}>
        {abilityName2},
      </Typography>
      <Typography sx={{ textDecoration: 'underline', fontSize: '0.9rem' }}>{abilityNameHidden} (H)</Typography>
    </Box>
  );
};
