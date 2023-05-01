import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const PokemonAlternativeFormsList = ({ pokemonForms }) => {
  return pokemonForms.length > 1 ? (
    <Box>
      <Typography fontSize="2rem">Alternative Forms</Typography>
      <Container>
        <Box display="flex" flexWrap="wrap">
          {pokemonForms.map((form, i) => {
            return (
              <Box key={`${form.name}-${i}`} display="flex" alignItems="center" margin="4px 16px 4px 4px">
                <ImageWithFallback
                  src={`/img/${form.filename}`}
                  fallbackSrc={`/img/${pokemonForms[0].filename}`}
                  width={30}
                  height={30}
                />
                <Typography marginLeft="8px">
                  {form.name}
                  {i < pokemonForms.length - 1 && ','}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  ) : null;
};
