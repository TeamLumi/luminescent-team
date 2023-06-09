import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { getEggGroupNameById } from '../../utils/dex/egggroup';

export const PokemonEggGroups = ({ eggGroupIds, sx }) => {
  return (
    <Box sx={{ ...sx }}>
      <Typography sx={{ fontWeight: 800, fontSize: '0.8rem' }}>Egg Groups:</Typography>
      <Container>
        <Box display="flex" alignItems="center">
          <img src="/img/pm0000_00_00_00_L.webp" alt="Pokemon Egg" width="16px" height="20px" />
          {eggGroupIds.map((eggGroupId, i) => {
            try {
              const eggGroupName = getEggGroupNameById(eggGroupId);
              return (
                <Typography key={`eggGroupId-${eggGroupId}`} marginLeft="8px">
                  {eggGroupName}
                  {i < eggGroupIds.length - 1 && ','}
                </Typography>
              );
            } catch (err) {
              return <Typography key={`eggGroupId-${eggGroupId}`}>{err.message}</Typography>;
            }
          })}
        </Box>
      </Container>
    </Box>
  );
};
