import React from 'react';
import { useQuery } from './useQuery';
import { MAX_CURRENT_POKEMON } from '../components/Pokedex/pokedexConstants';
import { useHistory, useLocation } from '@docusaurus/router';

const POKEMON_QUERY_PARAMETER_NAME = 'pokemon';

const isValidPokemonDexId = (pokemonDexId) => pokemonDexId >= 0 && pokemonDexId <= MAX_CURRENT_POKEMON;

export const usePokemonQuery = () => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  const parsedPokemonDexId = Math.floor(Number(query.get(POKEMON_QUERY_PARAMETER_NAME))) || 0;
  const pokemonDexId = isValidPokemonDexId(parsedPokemonDexId) ? parsedPokemonDexId : 0;

  const setPokemonDexId = (pokemonId) => {
    const params = new URLSearchParams({ [POKEMON_QUERY_PARAMETER_NAME]: pokemonId });
    history.push({ pathname: location.pathname, search: params.toString() });
  };

  return {
    pokemonDexId,
    setPokemonDexId,
  };
};
