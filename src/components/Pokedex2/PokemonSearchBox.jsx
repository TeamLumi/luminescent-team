import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useHistory } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const PokemonSearchBox = ({ pokemonNames, pokemonId }) => {
  const history = useHistory();
  const { path } = usePluginData('luminescent-pokedex-data-plugin');
  const pokedexPath = useBaseUrl(path);
  const options = pokemonNames.map((pokemon) => ({ id: pokemon.id, label: pokemon.name }));
  const pokemonName = options.find((p) => p.id === pokemonId);

  return (
    <Autocomplete
      disablePortal
      id="pokemonIdSelector"
      sx={{ width: 300 }}
      options={options}
      value={pokemonName}
      onChange={(_, pokemon) => {
        history.push(`${pokedexPath}/${pokemon.id}`);
      }}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={`search-field-${option.id}`}>
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Search Pokémon" />}
    />
  );
};
