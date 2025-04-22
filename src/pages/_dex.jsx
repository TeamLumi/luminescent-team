import React from 'react';
import Layout from '@theme/Layout';

import { GlobalState } from '../components/common/GlobalState';
import PokemonPageContent from '../components/Pokedex2/PokemonPageContent';
import PokemonPageHeader from '../components/Pokedex2/PokemonPageHeader';
import LumiReactThemeProvider from '../theme/LumiThemeProvider';

export default function PokemonPage({ pokemon, pokemonList, pokemon3, pokemonList3, pokemonV, pokemonListV }) {
  // required for webpack SSR
  if (typeof pokemon === 'undefined' || typeof pokemonList === 'undefined') {
    return null;
  }

  return (
    <Layout>
      <LumiReactThemeProvider>
        <GlobalState>
          <PokemonPageHeader pokemon={pokemon} pokemon3={pokemon3} pokemonV={pokemonV} />
          <PokemonPageContent
            pokemon={pokemon}
            pokemonNames={pokemonList}
            pokemon3={pokemon3}
            pokemonNames3={pokemonList3}
            pokemonV={pokemonV}
            pokemonNamesV={pokemonListV}
          />
        </GlobalState>
      </LumiReactThemeProvider>
    </Layout>
  );
};
