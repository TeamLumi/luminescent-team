import React from 'react';
import Layout from '@theme/Layout';
import { PokemonListPageContent } from '../components/Pokedex2/PokemonListPageContent';
import { GlobalState } from '../components/common/GlobalState';

const PokedexListPage = ({ pokemonList, pokemonList3 }) => {
  return (
    <Layout
      title="Pokédex"
      description="A ROM Hack for Pokémon Brilliant Diamond."
    >
      <GlobalState>
        <PokemonListPageContent pokemonList={pokemonList} pokemonList3={pokemonList3} />
      </GlobalState>
    </Layout>
  );
};

export default PokedexListPage;
