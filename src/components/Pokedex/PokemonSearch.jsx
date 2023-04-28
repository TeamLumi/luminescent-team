import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getPokemonNames, getPokemonIdFromName } from '../../utils/dex';

const MAX_CURRENT_POKEMON = 493;

export const PokemonSearch = ({ setPokemonDexId }) => {
  const pokemonNames = getPokemonNames(MAX_CURRENT_POKEMON);
  const [selectedPokemonName, setSelectedPokemonName] = useState(pokemonNames[1]);
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
