import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useHistory } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import { MAX_CURRENT_POKEMON } from './pokedexConstants';

const isValidPokemonDexId = (pokemonDexId) => pokemonDexId >= 0 && pokemonDexId <= MAX_CURRENT_POKEMON;

export const PokemonSearchBox = ({ pokemonNames, formNo, monsNo }) => {
  const { colorMode, setColorMode } = useColorMode();
  const history = useHistory();
  const { path } = usePluginData('luminescent-pokedex-data-plugin');
  const pokedexPath = useBaseUrl(path);
  const [options, setOptions] = useState(pokemonNames.map((pokemon) => ({ monsno: pokemon.monsno, formno: pokemon.formno, label: pokemon.name })));
  const [pokemonName, setPokemonName] = useState(options[0]);

  useEffect(() => {
    setOptions(pokemonNames.map((pokemon) => ({ monsno: pokemon.monsno, formno: pokemon.formno, label: pokemon.name })));
  }, [pokemonNames]);

  useEffect(() => {
    setPokemonName(options.find((p) => p.monsno === monsNo && p.formno === formNo ));
  }, [options]);

  return (
    <Autocomplete
      disablePortal
      id="pokemonIdSelector"
      sx={{
        width: {xs: "250px", sm: "300px"},
        gridArea: "a",
        backgroundColor: colorMode === "dark" ? "var(--ifm-background-color)" : "white",
      }}
      options={options}
      value={pokemonName}
      onChange={(_, pokemon) => {
        const pokemonPath = pokemon.formno === 0 ? pokemon.monsno : `${pokemon.monsno}_${pokemon.formno}`;
        history.push(`${pokedexPath}/${isValidPokemonDexId(pokemon.monsno) ? pokemonPath : 0}`);
      }}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      renderOption={(props, pokemon) => {
        const pokemonPath = pokemon.formno === 0 ? pokemon.monsno : `${pokemon.monsno}_${pokemon.formno}`;
        return (
          <li {...props} key={`search-field-${pokemonPath}`}>
            {pokemon.label}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Search Pokémon" />}
    />
  );
};
