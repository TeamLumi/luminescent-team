import React from 'react';
import Layout from '@theme/Layout';
import { PokemonListPageContent } from '../components/Pokedex2/PokemonListPageContent';

const PokedexListPage = ({ pokemonList }) => {
  return (
    <Layout
      title="Pokedex"
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl"
    >
      <PokemonListPageContent pokemonList={pokemonList} />
    </Layout>
  );
};

export default PokedexListPage;
