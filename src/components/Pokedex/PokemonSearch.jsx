import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getPokemonNames, getPokemonIdFromName } from '../../utils/dex';
import { MAX_CURRENT_POKEMON } from './pokedexConstants';

export const PokemonSearch = ({ pokemonDexId, setPokemonDexId }) => {
  // pokemonNameEndRange number is not including
  const pokemonNames = getPokemonNames(MAX_CURRENT_POKEMON + 1);
  const [selectedPokemonName, setSelectedPokemonName] = useState(pokemonNames[pokemonDexId]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
      disablePortal
      id="pokemonIdSelector"
      sx={{ width: 300 }}
      options={pokemonNames}
      value={selectedPokemonName}
      onChange={(_, newValue) => {
        setSelectedPokemonName(newValue);

        if (!newValue) {
          return;
        }

        const pokemonId = getPokemonIdFromName(newValue);
        if (pokemonId != null) {
          setPokemonDexId(pokemonId);
        }
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Search Pokemon" />}
    />
  );
};
