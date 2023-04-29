import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getPokemonNames, getPokemonIdFromName } from '../../utils/dex';
import { MAX_CURRENT_POKEMON } from './pokedexConstants';
import { useHistory, useLocation } from '@docusaurus/router';

export const PokemonSearch = ({ pokemonDexId, setPokemonDexId }) => {
  const history = useHistory();
  const location = useLocation();
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
          // setPokemonDexId(pokemonId);
          const params = new URLSearchParams({ pokemonId: pokemonId });
          history.push({ pathname: location.pathname, search: params.toString() });
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
