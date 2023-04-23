import React from 'react';
import { POKEMON_FORM_ID_MAP, getPokemonFormIndexById, getPokemonImageFilename } from '../../core/pokemonFormSelector';
import { Box, Typography } from '@mui/material';

export const PokemonAlternativeFormsList = ({ pokemonDexId }) => {
  const alternativeForms = POKEMON_FORM_ID_MAP[pokemonDexId].slice(1);

  return (
    <Box>
      <Typography fontSize="2rem">Alternative Forms</Typography>
      <Box>
        {alternativeForms.map((form) => {
          const formIndex = getPokemonFormIndexById(pokemonDexId, form.pokemonId);
          const formFilename = getPokemonImageFilename(pokemonDexId, formIndex);
          return <img key={form.formName} src={`/img/${formFilename}`} />;
        })}
      </Box>
    </Box>
  );
};
