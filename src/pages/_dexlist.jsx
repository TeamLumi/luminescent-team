import React from 'react';
import Layout from '@theme/Layout';
import { PokemonListPageContent } from '../components/Pokedex2/PokemonListPageContent';

const PokedexListPage = ({ pokemonList }) => {
  return (
    <Layout
      title="Pokédex"
      description="A ROM Hack for Pokémon Brilliant Diamond"
    >
      <PokemonListPageContent pokemonList={pokemonList} />
    </Layout>
  );
};

export default PokedexListPage;
