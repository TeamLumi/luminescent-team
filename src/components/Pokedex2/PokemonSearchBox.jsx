import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useHistory } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const PokemonSearchBox = ({ pokemonNames, formNo, monsNo }) => {
  const history = useHistory();
  const { path } = usePluginData('luminescent-pokedex-data-plugin');
  const pokedexPath = useBaseUrl(path);
  const options = pokemonNames.map((pokemon) => ({ monsno: pokemon.monsno, formno: pokemon.formno, label: pokemon.name }));
  const pokemonName = options.find((p) => p.monsno === monsNo && p.formno === formNo );

  return (
    <Autocomplete
      disablePortal
      id="pokemonIdSelector"
      sx={{ width: 300 }}
      options={options}
      value={pokemonName}
      onChange={(_, pokemon) => {
        history.push(`${pokedexPath}/${pokemon.formno === 0 ? pokemon.monsno : `${pokemon.monsno}_${pokemon.formno}`}`);
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
