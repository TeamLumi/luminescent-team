import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { POKEMON_FORM_ID_MAP, getPokemonFormIndexById, getPokemonImageFilename } from '../../core/pokemonFormSelector';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const PokemonAlternativeFormsList = ({ pokemonDexId }) => {
  const allPokemonForms = POKEMON_FORM_ID_MAP[pokemonDexId].map((form) => {
    const formIndex = getPokemonFormIndexById(pokemonDexId, form.pokemonId);
    const formFilename = getPokemonImageFilename(pokemonDexId, formIndex);

    return {
      formName: form.formName,
      formFilename: formFilename,
    };
  });

  return allPokemonForms.length > 1 ? (
    <Box>
      <Typography fontSize="2rem">Alternative Forms</Typography>
      <Container>
        <Box display="flex" flexWrap="wrap">
          {allPokemonForms.map((form, i) => {
            return (
              <Box key={form.formName} display="flex" alignItems="center" margin="4px 16px 4px 4px">
                <ImageWithFallback
                  src={`/img/${form.formFilename}`}
                  fallbackSrc={`/img/${allPokemonForms[0].formFilename}`}
                  width={30}
                  height={30}
                />
                <Typography marginLeft="8px">
                  {form.formName}
                  {i < allPokemonForms.length - 1 && ','}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  ) : null;
};
