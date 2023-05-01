import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const PokemonEggGroups = ({ eggGroupNames, sx }) => {
  return (
    <Box sx={{ ...sx }}>
      <Typography sx={{ fontWeight: 800, fontSize: '0.8rem' }}>Egg Groups:</Typography>
      <Container>
        <Box display="flex" alignItems="center">
          <img src="/img/pm0000_00_00_00_L.webp" alt="Pokemon Egg" width="16px" height="20px" />
          {eggGroupNames.map((eggGroupName, i) => {
            try {
              return (
                <Typography key={`eggGroupName-${eggGroupName}`} marginLeft="8px">
                  {eggGroupName}
                  {i < eggGroupNames.length - 1 && ','}
                </Typography>
              );
            } catch (err) {
              return <Typography key={`eggGroupName-${eggGroupName}`}>{err.message}</Typography>;
            }
          })}
        </Box>
      </Container>
    </Box>
  );
};
