import React from 'react';
import Layout from '@theme/Layout';
import { PokemonListPageContent } from '../components/Pokedex2/PokemonListPageContent';
import { GlobalState } from '../components/common/GlobalState';
import LumiReactThemeProvider from '../theme/LumiThemeProvider';

const PokedexListPage = ({ pokemonList, pokemonList3, pokemonListV }) => {
  return (
    <Layout
      title="Pokédex"
      description="A ROM Hack for Pokémon Brilliant Diamond."
    >
      <LumiReactThemeProvider>
        <GlobalState>
          <PokemonListPageContent
            pokemonList={pokemonList}
            pokemonList3={pokemonList3}
            pokemonListV={pokemonListV}
          />
        </GlobalState>
      </LumiReactThemeProvider>
    </Layout>
  );
};

export default PokedexListPage;
