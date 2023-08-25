import React from 'react';
import Layout from '@theme/Layout';
import { PokemonPageContent } from '../components/Pokedex2/PokemonPageContent';

export default function PokemonPage({ pokemon, pokemonList }) {
  // required for webpack SSR
  if (typeof pokemon === 'undefined' || typeof pokemonList === 'undefined') {
    return null;
  }

  return (
    <Layout
      title={pokemon.name}
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl"
    >
      <PokemonPageContent pokemon={pokemon} pokemonNames={pokemonList} />
    </Layout>
  );
}
